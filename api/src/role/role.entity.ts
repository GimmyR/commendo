import { Role, RoleName } from '@prisma/client';

export type RoleWithNames = Role & { names: RoleName[] };
