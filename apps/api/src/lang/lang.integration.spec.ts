import { PrismaService } from "@/prisma/prisma.service";
import { HttpStatus, INestApplication } from "@nestjs/common";
import { initIntegrationTest } from "src/test.helper";

describe("Test LangController", () => {
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

    it("Should get all languages", async () => {
        const res = await fetch(`${apiURL}/api/lang`);
        expect(res.status).toBe(HttpStatus.OK);
        const body = await res.json();
        expect(body.length).toBe(2);
    });
});
