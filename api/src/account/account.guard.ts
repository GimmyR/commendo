import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { AccountService } from 'src/account/account.service';

@Injectable()
export class AccountGuard implements CanActivate {
    constructor(
        private readonly accountServ: AccountService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = await this.extractToken(request);
        request["user"] = await this.accountServ.verifyToken(token);
        return true;
    }

    private async extractToken(request: Request) {
        const auth = request.headers.authorization;

        if(!auth) throw new UnauthorizedException("Access Token is missing");

        const chars = auth.split(" ");

        if(chars.length < 2 || chars[0] != "Bearer") throw new UnauthorizedException("Access Token is invalid");

        return chars[1];
    }
}