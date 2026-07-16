import { PrismaService } from "@/prisma/prisma.service";
import { initIntegrationTest } from "@/test.helper";
import { HttpStatus, INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Order } from "@prisma/client";

describe("Test OrderController", () => {
    let app: INestApplication;
    let apiURL: string;
    let prisma: PrismaService;
    let jwtService: JwtService;
    let mockToken: string;

    beforeAll(async () => {
        app = await initIntegrationTest();
        apiURL = await app.getUrl();
        prisma = app.get<PrismaService>(PrismaService);
        jwtService = app.get<JwtService>(JwtService);
        mockToken = jwtService.sign({ sub: 1, name: "admin", roles: [1] });
    });

    afterAll(async () => {
        if(prisma)
            await prisma.$disconnect();

        if(app)
            await app.close();
    });

    beforeEach(async () => {
        await prisma.$executeRaw`
            TRUNCATE TABLE
                cmd_dish_ingredient, 
                cmd_dish_name, 
                cmd_dish, 
                cmd_ingredient_name, 
                cmd_dish_ingredient, 
                cmd_table
            RESTART IDENTITY CASCADE`;

        await prisma.$executeRawUnsafe(`
            INSERT INTO "public".cmd_ingredient (unit, active) VALUES ('g', true);
            INSERT INTO "public".cmd_ingredient_name ("ingredientId", "langId", name) VALUES (1, 1, 'Filet de boeuf');
            INSERT INTO "public".cmd_ingredient_name ("ingredientId", "langId", name) VALUES (1, 2, 'Beef fillet');
            INSERT INTO "public".cmd_dish (price, active) VALUES (3000, true);
            INSERT INTO "public".cmd_dish_name ("dishId", "langId", name, active) VALUES (1, 1, 'Viande grillée', true);
            INSERT INTO "public".cmd_dish_name ("dishId", "langId", name, active) VALUES (1, 2, 'Grilled meat', true);
            INSERT INTO "public".cmd_dish_ingredient ("dishId", "ingredientId", quantity) VALUES (1, 1, 200);
            INSERT INTO "public".cmd_table ("tableRef", availability) VALUES ('01', 1);
            INSERT INTO "public".cmd_order ("tableId", "dishId", status) VALUES (1, 1, 5);
        `);
    });

    it("Should return orders", async () => {
        const res = await fetch(`${apiURL}/api/order`, {
            headers: {
                "Authorization": `Bearer ${mockToken}`
            }
        });

        expect(res.status).toBe(HttpStatus.OK);
        const orders: Order[] = await res.json();
        expect(orders.length).toBe(1);
        expect(orders[0].tableId).toBe(1);
        expect(orders[0].dishId).toBe(1);
        expect(orders[0].status).toBe(5);
    });
});