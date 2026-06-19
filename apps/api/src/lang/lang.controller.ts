import { Body, Controller, Get, HttpStatus, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccountGuard } from 'src/account/account.guard';
import { CreateLanguageRequest } from 'src/lang/lang.dto';
import { LangInterceptor } from 'src/lang/lang.interceptor';
import { LangService } from 'src/lang/lang.service';
import { Roles } from 'src/role/role.decorator';
import { RoleGuard } from 'src/role/role.guard';

@Controller('lang')
@ApiTags("lang")
@ApiBearerAuth("access-token")
export class LangController {
    constructor(
        private readonly langServ: LangService
    ) {}

    @Get()
    async getAll() {
        return await this.langServ.getAll();
    }

    @Get(":abbrev")
    @UseInterceptors(LangInterceptor)
    async getUniqueByAbbreviation(@Param("abbrev") abbrev: string) {
        return await this.langServ.getUniqueByAbbreviation(abbrev);
    }

    @Post()
    @Roles({ name: "Admin", langAbbrev: "fr" })
    @UseGuards(AccountGuard, RoleGuard)
    @ApiOperation({ summary: "Create language with his name" })
    @ApiResponse({ status: HttpStatus.CREATED, description: "Language has been successfully created" })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Access token is invalid" })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: "You don't have permissions to do this" })
    async create(@Body() lang: CreateLanguageRequest) {
        return this.langServ.create(lang);
    }
}
