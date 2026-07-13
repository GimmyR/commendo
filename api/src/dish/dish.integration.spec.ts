import { PrismaService } from "@/prisma/prisma.service";
import { initIntegrationTest } from "@/test.helper";
import { HttpStatus, INestApplication } from "@nestjs/common";

describe("Test DishController", () => {
    let app: INestApplication;
    let apiURL: string;
    let prisma: PrismaService;

    beforeAll(async () => {
        app = await initIntegrationTest();
        apiURL = await app.getUrl();
        prisma = app.get<PrismaService>(PrismaService);
    });

    afterAll(async () => {
        if(prisma)
            await prisma.$disconnect();

        if(app)
            await app.close();
    });

    beforeEach(async () => {
        await prisma.$executeRaw`TRUNCATE TABLE cmd_dish_ingredient, cmd_dish_name, cmd_dish, cmd_ingredient_name, cmd_dish_ingredient RESTART IDENTITY CASCADE`;

        await prisma.$executeRawUnsafe(`
            INSERT INTO "public".cmd_ingredient (unit, active) VALUES ('g', true);
            INSERT INTO "public".cmd_ingredient_name ("ingredientId", "langId", name) VALUES (1, 1, 'Filet de boeuf');
            INSERT INTO "public".cmd_ingredient_name ("ingredientId", "langId", name) VALUES (1, 2, 'Beef fillet');
            INSERT INTO "public".cmd_dish (price, active) VALUES (3000, true);
            INSERT INTO "public".cmd_dish_name ("dishId", "langId", name, active) VALUES (1, 1, 'Viande grillée', true);
            INSERT INTO "public".cmd_dish_name ("dishId", "langId", name, active) VALUES (1, 2, 'Grilled meat', true);
            INSERT INTO "public".cmd_dish_ingredient ("dishId", "ingredientId", quantity) VALUES (1, 1, 200);
        `);
    });

    it("Should return dish with ingredient in french", async () => {
        const res = await fetch(`${apiURL}/api/dish?lang=fr`);
        expect(res.status).toBe(HttpStatus.OK);
        const body = await res.json();
        expect(body.data).toBeDefined();
        expect(body.data.length).toBe(1);
        const dish = body.data[0];
        expect(dish.id).toBe(1);
        expect(dish.names.length).toBe(1);
        expect(dish.ingredients.length).toBe(1);
        const ingredient = dish.ingredients[0];
        expect(ingredient.ingredient).toBeDefined();
        expect(ingredient.ingredient.names.length).toBe(1);
    });
});