import { Module } from '@nestjs/common';
import { LangModule } from './lang/lang.module';
import { PrismaModule } from './prisma/prisma.module';
import { AccountModule } from './account/account.module';
import { RoleModule } from './role/role.module';
import { SeederModule } from './seeder/seeder.module';
import { ResourceModule } from './resource/resource.module';
import { CleanerModule } from './cleaner/cleaner.module';

@Module({
  imports: [LangModule, PrismaModule, AccountModule, RoleModule, SeederModule, ResourceModule, CleanerModule],
})
export class AppModule {}
