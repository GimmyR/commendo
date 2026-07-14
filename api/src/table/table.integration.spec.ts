import { PrismaService } from "@/prisma/prisma.service";
import { initIntegrationTest } from "@/test.helper";
import { HttpStatus, INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Table } from "@prisma/client";

describe("Test TableController", () => {
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
        await prisma.$executeRaw`TRUNCATE TABLE cmd_table RESTART IDENTITY CASCADE`;

        await prisma.$executeRawUnsafe(`
            INSERT INTO "public".cmd_table ("tableRef", availability) VALUES ('01', 1);
        `);
    });

    it("Should return all tables", async () => {
        const res = await fetch(`${apiURL}/api/table`, {
            headers: {
                "Authorization": `Bearer ${mockToken}`
            }
        });

        expect(res.status).toBe(HttpStatus.OK);
        const body: Table[] = await res.json();
        expect(body.length).toBe(1);
        expect(body[0].id).toBe(1);
        expect(body[0].tableRef).toBe("01");
        expect(body[0].availability).toBe(1);
    });
});