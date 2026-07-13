import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        JwtModule.registerAsync({
            global: true,
            useFactory: async () => ({
                secret: process.env.JWT_SECRET,
            }),
        }),
    ],
    controllers: [AccountController],
    providers: [AccountService],
})
export class AccountModule {}
