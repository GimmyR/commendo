import { EditPassword, SignIn } from '@/account/account.dto';
import { Body, Controller, HttpStatus, Patch, Post, Req, UnauthorizedException, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Request } from 'express';
import { AccountGuard } from 'src/account/account.guard';
import { SignInInterceptor } from 'src/account/account.interceptor';
import { AccountService } from 'src/account/account.service';

@Controller('account')
@ApiTags('account')
export class AccountController {
    constructor(private readonly accountServ: AccountService) {}

    @Post('sign-in')
    @UseInterceptors(SignInInterceptor)
    @ApiOperation({ summary: 'Sign in and get access token' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'User has been successfully signed in' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Username or password is invalid' })
    async signIn(@Body() account: SignIn) {
        const user = await this.accountServ.findByUsername(account.username);

        if (!user || !(await this.accountServ.comparePasswords(account.password, user.password)))
            throw new UnauthorizedException('Username or password is invalid');

        return user;
    }

    @Patch()
    @UseGuards(AccountGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Edit password' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Password has been successfully updated' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Access token or password is invalid' })
    async editPassword(@Body() account: EditPassword, @Req() req: Request) {
        const user = await this.accountServ.editPassword(req, account);
        return { id: user.id };
    }
}
