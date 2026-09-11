import { CreateMovement } from "@/inventory/inventory.dto";
import { PrismaService } from "@/prisma/prisma.service";
import { initIntegrationTest } from "@/test.helper";
import { HttpStatus, INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IngredientMovement } from "@prisma/client";

describe("Test InventoryController", () => {
    let app: INestApplication;
    let apiURL: string;
    let prisma: PrismaService;
    let jwtServ: JwtService;
    let mockToken: string;

    beforeAll(async () => {
        app = await initIntegrationTest();
        apiURL = await app.getUrl();
        prisma = app.get<PrismaService>(PrismaService);
        jwtServ = app.get<JwtService>(JwtService);
        mockToken = jwtServ.sign({ sub: 1, name: "admin", roles: [1] });
    });

    afterAll(async () => {
        if(prisma) await prisma.$disconnect();

        if(app) await app.close();
    });

    beforeEach(async () => {
        await prisma.$executeRaw`TRUNCATE TABLE cmd_ingredient, cmd_ingredient_name, cmd_ingredient_movement RESTART IDENTITY CASCADE`;

        await prisma.$executeRawUnsafe(`
            INSERT INTO "public".cmd_ingredient (unit, active) VALUES ('g', true);
            INSERT INTO "public".cmd_ingredient_name ("ingredientId", "langId", name) VALUES (1, 1, 'Filet de boeuf');
            INSERT INTO "public".cmd_ingredient_name ("ingredientId", "langId", name) VALUES (1, 2, 'Beef fillet');
            INSERT INTO "public".cmd_ingredient_movement ("ingredientId", "type", quantity, "purchasePrice") VALUES (1, 1, 10000, 240000);
        `);
    });

    it("Should return movements", async () => {
        const res = await fetch(`${apiURL}/api/inventory?lang=eng`, {
            headers: {
                "Authorization": `Bearer ${mockToken}`
            }
        });

        expect(res.status).toBe(HttpStatus.OK);
        const movements: IngredientMovement[] = await res.json();
        expect(movements).toBeDefined();
        expect(movements.length).toBe(1);
        expect(movements[0].id).toBe(1);
        expect(movements[0].ingredientId).toBe(1);
        expect(movements[0].type).toBe(1);
        expect(movements[0].quantity).toBe(10000);
        expect(movements[0].purchasePrice).toBe(240000);
    });

    it("Should return unique movement", async () => {
        const res = await fetch(`${apiURL}/api/inventory/1?lang=eng`, {
            headers: {
                "Authorization": `Bearer ${mockToken}`
            }
        });

        expect(res.status).toBe(HttpStatus.OK);
        const movement: IngredientMovement = await res.json();
        expect(movement).toBeDefined();
        expect(movement.id).toBe(1);
        expect(movement.ingredientId).toBe(1);
        expect(movement.type).toBe(1);
        expect(movement.quantity).toBe(10000);
        expect(movement.purchasePrice).toBe(240000);
    });

    it("Should create movement", async () => {
        const movement: CreateMovement = new CreateMovement({
            ingredientId: 1,
            type: 1,
            quantity: 5000,
            purchasePrice: 120000
        });

        const res = await fetch(`${apiURL}/api/inventory`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${mockToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(movement)
        });

        expect(res.status).toBe(HttpStatus.CREATED);
        const newMovement: IngredientMovement = await res.json();
        expect(newMovement).toBeDefined();
        expect(newMovement.id).toBe(2);
        expect(newMovement.ingredientId).toBe(1);
        expect(newMovement.type).toBe(1);
        expect(newMovement.quantity).toBe(5000);
        expect(newMovement.purchasePrice).toBe(120000);
    });
});