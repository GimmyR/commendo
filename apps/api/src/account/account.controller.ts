import { Body, Controller, Patch, Post, Req, UnauthorizedException, UseGuards, UseInterceptors } from '@nestjs/common';
import { EditPassword, SignIn } from '@repo/shared';
import type { Request } from 'express';
import { AccountGuard } from 'src/account/account.guard';
import { SignInInterceptor } from 'src/account/account.interceptor';
import { AccountService } from 'src/account/account.service';
import { ValidationInterceptor } from 'src/validation/validation.interceptor';

@Controller('account')
export class AccountController {
    constructor(
        private readonly accountServ: AccountService
    ) {}

    @Post("sign-in")
    @UseInterceptors(new ValidationInterceptor(SignIn), SignInInterceptor)
    async signIn(@Body() account: SignIn) {
        const user = await this.accountServ.findByUsername(account.username);

        if(!user || !(await this.accountServ.comparePasswords(account.password, user.password)))
            throw new UnauthorizedException("Username or password is invalid");

        return user;
    }

    @Patch()
    @UseInterceptors(new ValidationInterceptor(EditPassword))
    @UseGuards(AccountGuard)
    async editPassword(@Body() account: EditPassword, @Req() req: Request) {
        const user = await this.accountServ.editPassword(req, account);
        return { id: user.id };
    }
}
