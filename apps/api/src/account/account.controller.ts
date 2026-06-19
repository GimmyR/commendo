import { Body, Controller, Patch, Post, Req, UnauthorizedException, UseGuards, UseInterceptors } from '@nestjs/common';
import type { Request } from 'express';
import { EditPasswordRequest, SignUpRequest } from 'src/account/account.dto';
import { AccountGuard } from 'src/account/account.guard';
import { SignInInterceptor } from 'src/account/account.interceptor';
import { AccountService } from 'src/account/account.service';

@Controller('account')
export class AccountController {
    constructor(
        private readonly accountServ: AccountService
    ) {}

    @Post("sign-up")
    async signUp(@Body() account: SignUpRequest) {
        return await this.accountServ.create(account);
    }

    @Post("sign-in")
    @UseInterceptors(SignInInterceptor)
    async signIn(@Body() account: SignUpRequest) {
        const user = await this.accountServ.findByUsername(account.username);

        if(!user || !(await this.accountServ.comparePasswords(account.password, user.password)))
            throw new UnauthorizedException("Username or password is invalid");

        return user;
    }

    @Patch()
    @UseGuards(AccountGuard)
    async editPassword(@Body() account: EditPasswordRequest, @Req() req: Request) {
        const user = await this.accountServ.editPassword(req, account);
        return { id: user.id };
    }
}
