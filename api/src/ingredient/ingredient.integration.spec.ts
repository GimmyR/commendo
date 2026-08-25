import { CreateIngredient } from "@/ingredient/ingredient.dto";
import { PrismaService } from "@/prisma/prisma.service";
import { initIntegrationTest } from "@/test.helper";
import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Ingredient, IngredientName } from "@prisma/client";

describe("Test IngredientController", () => {
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

    it("Should create ingredient with name in english", async () => {
        const ingredient: CreateIngredient = new CreateIngredient({
            unit: "g",
            names: [
                { lang: "eng", name: "Rice" }
            ]
        });

        const res = await fetch(`${apiURL}/api/ingredient`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${mockToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ingredient)
        });

        expect(res.ok).toBe(true);
        const newIngredient: Ingredient = await res.json();
        expect(newIngredient).toBeDefined();
        expect(newIngredient.id).toBe(2);
        expect(newIngredient.unit).toBe(ingredient.unit);
        expect(newIngredient.active).toBe(true);
    });
});