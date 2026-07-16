import { PrismaService } from "@/prisma/prisma.service";
import { EditTable } from "@/table/table.dto";
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
            INSERT INTO "public".cmd_table ("tableRef", availability) VALUES ('02', 2);
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
        expect(body.length).toBe(2);
        expect(body[0].id).toBe(1);
        expect(body[0].tableRef).toBe("01");
        expect(body[0].availability).toBe(1);
    });

    it("Should return unique table", async () => {
        const res = await fetch(`${apiURL}/api/table/1`, {
            headers: {
                "Authorization": `Bearer ${mockToken}`
            }
        });

        expect(res.status).toBe(HttpStatus.OK);
        const body: Table = await res.json();
        expect(body).toBeDefined();
        expect(body.id).toBe(1);
        expect(body.tableRef).toBe("01");
        expect(body.availability).toBe(1);
    });

    it("Should edit table", async () => {
        const table: EditTable = new EditTable({
            availability: 2
        });

        const res = await fetch(`${apiURL}/api/table/1`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${mockToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(table)
        });

        expect(res.status).toBe(HttpStatus.OK);
        const body: Table = await res.json();
        expect(body).toBeDefined();
        expect(body.id).toBe(1);
        expect(body.tableRef).toBe("01");
        expect(body.availability).toBe(2);
    });
});