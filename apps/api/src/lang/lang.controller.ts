import { Body, Controller, Get, HttpStatus, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateLanguage } from '@repo/shared';
import { AccountGuard } from 'src/account/account.guard';
import { CreateLanguageDoc } from 'src/lang/lang.doc';
import { LangInterceptor } from 'src/lang/lang.interceptor';
import { LangService } from 'src/lang/lang.service';
import { Roles } from 'src/role/role.decorator';
import { RoleGuard } from 'src/role/role.guard';
import { ValidationInterceptor } from 'src/validation/validation.interceptor';

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
    @UseInterceptors(new ValidationInterceptor(CreateLanguage))
    @Roles(1)
    @UseGuards(AccountGuard, RoleGuard)
    @ApiOperation({ summary: "Create language with his name" })
    @ApiBody(CreateLanguageDoc)
    @ApiResponse({ status: HttpStatus.CREATED, description: "Language has been successfully created" })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Access token is invalid" })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: "You don't have permissions to do this" })
    async create(@Body() lang: CreateLanguage) {
        return this.langServ.create(lang);
    }
}
