import { EditPasswordDoc, SignInDoc } from '@/account/account.doc';
import { Body, Controller, HttpStatus, Patch, Post, Req, UnauthorizedException, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EditPassword, SignIn } from '@repo/shared';
import type { Request } from 'express';
import { AccountGuard } from 'src/account/account.guard';
import { SignInInterceptor } from 'src/account/account.interceptor';
import { AccountService } from 'src/account/account.service';
import { ValidationInterceptor } from 'src/validation/validation.interceptor';

@Controller('account')
@ApiTags('account')
export class AccountController {
    constructor(
        private readonly accountServ: AccountService
    ) {}

    @Post("sign-in")
    @UseInterceptors(new ValidationInterceptor(SignIn), SignInInterceptor)
    @ApiOperation({ summary: "Sign in and get access token" })
    @ApiBody(SignInDoc)
    @ApiResponse({ status: HttpStatus.CREATED, description: "User has been successfully signed in" })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Username or password is invalid" })
    async signIn(@Body() account: SignIn) {
        const user = await this.accountServ.findByUsername(account.username);

        if(!user || !(await this.accountServ.comparePasswords(account.password, user.password)))
            throw new UnauthorizedException("Username or password is invalid");

        return user;
    }

    @Patch()
    @UseInterceptors(new ValidationInterceptor(EditPassword))
    @UseGuards(AccountGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: "Edit password" })
    @ApiBody(EditPasswordDoc)
    @ApiResponse({ status: HttpStatus.OK, description: "Password has been successfully updated" })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Access token or password is invalid" })
    async editPassword(@Body() account: EditPassword, @Req() req: Request) {
        const user = await this.accountServ.editPassword(req, account);
        return { id: user.id };
    }
}
