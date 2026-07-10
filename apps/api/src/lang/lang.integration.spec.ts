import { HttpStatus, INestApplication } from "@nestjs/common";
import { CleanerService } from "src/cleaner/cleaner.service";
import { initIntegrationTest } from "src/test.helper";

describe("Test LangController", () => {
    let app: INestApplication;
    let apiURL: string;
    let cleaner: CleanerService;

    beforeAll(async () => {
        app = await initIntegrationTest();
        apiURL = await app.getUrl();
        cleaner = app.get<CleanerService>(CleanerService);
    });

    afterAll(async () => {
        await cleaner.reinitDatabase();

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
