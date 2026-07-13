import { EditPassword, SignIn } from '@/account/account.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { initIntegrationTest } from '@/test.helper';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

describe('Test AccountController', () => {
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
        mockToken = jwtService.sign({ sub: 1, name: 'admin', roles: [1] });
    });

    afterAll(async () => {
        if (prisma) await prisma.$disconnect();

        if (app) await app.close();
    });

    it('Should sign in correctly', async () => {
        const credentials: Pick<SignIn, keyof SignIn> = {
            username: 'admin',
            password: 'pwdAdmin',
        };

        const res = await fetch(`${apiURL}/api/account/sign-in`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        expect(res.status).toBe(HttpStatus.CREATED);
    });

    it('Should edit password correctly', async () => {
        const passwords: Pick<EditPassword, keyof EditPassword> = {
            currentPassword: 'pwdAdmin',
            newPassword: 'pwd123',
        };

        const res = await fetch(`${apiURL}/api/account`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${mockToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(passwords),
        });

        expect(res.status).toBe(HttpStatus.OK);
    });
});
