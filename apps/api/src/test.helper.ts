import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { execSync } from "child_process";
import { AppModule } from "src/app.module";

export async function initIntegrationTest(): Promise<INestApplication> {
    execSync("npx prisma migrate deploy", { env: process.env });

    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule]
    }).compile();

    const app = moduleFixture.createNestApplication();
    app.setGlobalPrefix("api");
    await app.init();
    await app.listen(0);
    return app;
}