import { PrismaService } from "@/prisma/prisma.service";
import { initIntegrationTest } from "@/test.helper";
import { INestApplication } from "@nestjs/common";
import { Ingredient, IngredientName } from "@prisma/client";

describe("Test IngredientController", () => {
    let app: INestApplication;
    let apiURL: string;
    let prisma: PrismaService;

    beforeAll(async () => {
        app = await initIntegrationTest();
        apiURL = await app.getUrl();
        prisma = app.get<PrismaService>(PrismaService);
    });

    afterAll(async () => {
        if(prisma) await prisma.$disconnect();

        if(app) await app.close();
    });

    beforeEach(async () => {
        await prisma.$executeRaw`TRUNCATE TABLE cmd_ingredient, cmd_ingredient_name RESTART IDENTITY CASCADE`;

        await prisma.$executeRawUnsafe(`
            INSERT INTO "public".cmd_ingredient (unit, active) VALUES ('g', true);
            INSERT INTO "public".cmd_ingredient_name ("ingredientId", "langId", name) VALUES (1, 1, 'Filet de boeuf');
            INSERT INTO "public".cmd_ingredient_name ("ingredientId", "langId", name) VALUES (1, 2, 'Beef fillet');
        `);
    });

    it("Should return all ingredients with the specified language", async () => {
        const res = await fetch(`${apiURL}/api/ingredient?lang=eng`);
        expect(res.ok).toBe(true);
        const ingredients: (Ingredient & { names: IngredientName[] })[] = await res.json();
        expect(ingredients.length).toBe(1);
        expect(ingredients[0].names.length).toBe(1);
        expect(ingredients[0].names[0].name).toBe("Beef fillet");
    });
});