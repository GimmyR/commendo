import { SetMetadata } from '@nestjs/common';
import { CreateRoleWithLangAbbrev } from '@repo/shared';

export const Roles = (...args: CreateRoleWithLangAbbrev[]) => SetMetadata('roles', args);
