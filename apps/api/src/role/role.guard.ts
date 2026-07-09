import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private reflector: Reflector
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.get<number[]>("roles", context.getHandler());

        if(!requiredRoles) return true;

        const request = context.switchToHttp().getRequest();
        const roles: number[] = request["user"].roles;

        for(const required of requiredRoles) {
            if(roles.includes(required))
                return true;
        }

        throw new ForbiddenException("You don't have permissions to do this");
    }
}