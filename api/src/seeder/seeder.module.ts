import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { LangService } from 'src/lang/lang.service';
import { RoleService } from 'src/role/role.service';
import { AccountService } from 'src/account/account.service';

@Module({
    providers: [SeederService, LangService, RoleService, AccountService],
})
export class SeederModule {}
