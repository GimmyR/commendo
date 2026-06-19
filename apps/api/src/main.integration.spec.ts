import { INestApplication } from "@nestjs/common";
import { CleanerService } from "src/cleaner/cleaner.service";
import { PrismaService } from "src/prisma/prisma.service";
import { initIntegrationTest } from "src/test.helper";

describe("Test Testcontainers with PostgreSQL", () => {
    let app: INestApplication;
    let prisma: PrismaService;
    let cleaner: CleanerService;

    beforeAll(async () => {
        app = await initIntegrationTest();
        prisma = app.get<PrismaService>(PrismaService);
        cleaner = app.get<CleanerService>(CleanerService);
    });

    afterAll(async () => {
        await cleaner.reinitDatabase();

        if(prisma)
            await prisma.$disconnect();

        if(app)
            await app.close();
    });

    it("Should get database URL from Testcontainers", () => {
        expect(process.env.DATABASE_URL).toBeDefined();
        expect(process.env.DATABASE_URL).toContain("postgres://test_user:test_password@");
    });

    it("Should confirm struct data exists in test database", async () => {
        const countLang = await prisma.lang.count();
        expect(countLang).toBe(1);
        const countRole = await prisma.role.count();
        expect(countRole).toBe(1);
        const countAccount = await prisma.account.count();
        expect(countAccount).toBe(1);
    });
});
