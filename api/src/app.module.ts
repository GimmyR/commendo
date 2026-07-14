import { Module } from '@nestjs/common';
import { LangModule } from './lang/lang.module';
import { PrismaModule } from './prisma/prisma.module';
import { AccountModule } from './account/account.module';
import { RoleModule } from './role/role.module';
import { SeederModule } from './seeder/seeder.module';
import { ResourceModule } from './resource/resource.module';
import { DishModule } from './dish/dish.module';
import { TableModule } from './table/table.module';

@Module({
    imports: [LangModule, PrismaModule, AccountModule, RoleModule, SeederModule, ResourceModule, DishModule, TableModule],
})
export class AppModule {}
