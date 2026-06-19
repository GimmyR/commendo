import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { getMulterOptions } from 'src/resource/multer.config';
import { ResourceService } from 'src/resource/resource.service';

@Controller('resource')
export class ResourceController {
    constructor(
        private readonly resourceServ: ResourceService
    ) {}

    @Get(":filename")
    async getByFilename(@Param("filename") filename: string, @Res() res: Response) {
        const fileStream = this.resourceServ.getByFilename(filename);
        fileStream.pipe(res)
    }

    @Post()
    @UseInterceptors(FileInterceptor("file", getMulterOptions()))
    async uploadImage(@UploadedFile() file: Express.Multer.File) {
        return {
            message: "Image has been successfully uploaded",
            filename: file.filename,
            path: `/api/resource/${file.filename}`
        };
    }
}