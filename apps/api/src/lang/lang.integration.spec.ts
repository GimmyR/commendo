import { HttpStatus, INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateLanguage } from "@repo/shared";
import { CleanerService } from "src/cleaner/cleaner.service";
import { initIntegrationTest } from "src/test.helper";

describe("Test LangController", () => {
    let app: INestApplication;
    let apiURL: string;
    let cleaner: CleanerService;
    let jwtService: JwtService;
    let mockToken: string;

    beforeAll(async () => {
        app = await initIntegrationTest();
        apiURL = await app.getUrl();
        cleaner = app.get<CleanerService>(CleanerService);
        jwtService = app.get<JwtService>(JwtService);
        mockToken = jwtService.sign({ sub: 1, name: "admin", roles: [1] });
    });

    afterAll(async () => {
        await cleaner.reinitDatabase();

        if(app)
            await app.close();
    });

    it("Should create language", async () => {
        const language: CreateLanguage = new CreateLanguage({
            name: "English",
            abbrev: "eng"
        });

        const res = await fetch(`${apiURL}/api/lang`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${mockToken}`,
                "Content-type": "application/json"
            },
            body: JSON.stringify(language)
        });

        expect(res.status).toBe(HttpStatus.CREATED);
    });
});
