import { Controller, Get, Headers, Param, Post, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { ResourceService } from 'src/resource/resource.service';

@Controller('resource')
export class ResourceController {
    constructor(
        private readonly resourceServ: ResourceService
    ) {}

    @Get(":filename")
    async getByFilename(@Param("filename") filename: string, @Res() res: Response) {
        this.resourceServ.findByFilename(res, filename);
    }

    @Post()
    async uploadImage(@Req() req: Request, @Headers("x-file-name") filename: string) {
        const resourcePath = await this.resourceServ.saveImage(req, filename);
        return { pathname: resourcePath };
    }
}