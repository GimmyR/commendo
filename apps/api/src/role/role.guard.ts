import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CreateRoleWithLangAbbrev } from '@repo/shared';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private readonly roleServ: RoleService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.get<CreateRoleWithLangAbbrev[]>("roles", context.getHandler());

        if(!requiredRoles) return true;

        const request = context.switchToHttp().getRequest();
        const roles: number[] = request["user"].roles;

        for(const required of requiredRoles) {
            const role = await this.roleServ.getUniqueByRoleNameAndLangAbbrev(required);
            
            if(role && roles.includes(role.id))
                return true;
        }

        throw new ForbiddenException("You don't have permissions to do this");
    }
}