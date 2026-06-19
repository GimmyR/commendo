import { SetMetadata } from '@nestjs/common';
import { CreateRoleWithLangAbbrev } from 'src/role/role.dto';

export const Roles = (...args: CreateRoleWithLangAbbrev[]) => SetMetadata('roles', args);
