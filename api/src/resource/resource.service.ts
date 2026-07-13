import { BadRequestException, Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import path, { join } from 'path';
import * as fs from 'fs';
import { format } from 'date-fns';
import { Readable } from 'stream';
import { Response } from 'express';
import { fromBuffer } from 'file-type';

@Injectable()
export class ResourceService implements OnModuleInit {
    private readonly logger = new Logger(ResourceService.name);

    async onModuleInit() {
        const resourcePath = path.resolve(process.cwd(), 'resources');

        try {
            fs.mkdirSync(resourcePath, { recursive: true });
            this.logger.log('Folder to store resources has been successfully created or already exists');
        } catch (error: any) {
            this.logger.error(`Cannot create folder to store resources at ${resourcePath}`, error.stack);
        }
    }

    findByFilename(response: Response, filename: string) {
        const filePath = join(process.cwd(), 'resources', filename);

        if (!fs.existsSync(filePath)) throw new NotFoundException(`File not found : ${filename}`);

        const stream = fs.createReadStream(filePath);
        stream.pipe(response);
    }

    async create(stream: Readable, accept?: string[]): Promise<string> {
        const buffer = await this.streamToBuffer(stream);
        const streamWithFileType = await fromBuffer(buffer);
        const acceptLC = accept ? accept.map((type) => type.toLowerCase()) : [];

        if (!streamWithFileType || !streamWithFileType.mime || !streamWithFileType.ext)
            throw new BadRequestException('File is invalid or corrupted');

        if (!acceptLC.includes(streamWithFileType.ext.toLowerCase()))
            throw new BadRequestException(`File type is unexpected : ${streamWithFileType.ext}`);

        const filenameWithoutExtension = format(new Date(), 'yyyyMMddHHmmss');
        return this.writeStream(Readable.from(buffer), `${filenameWithoutExtension}.${streamWithFileType.ext}`);
    }

    private async streamToBuffer(stream: Readable): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            const chunks: Buffer[] = [];

            stream.on('data', (chunk: Buffer) => {
                chunks.push(chunk);
            });

            stream.on('end', () => {
                resolve(Buffer.concat(chunks));
            });

            stream.on('error', (err: Error) => {
                reject(err);
            });
        });
    }

    private async writeStream(stream: Readable, filename: string): Promise<string> {
        const resourcePath = join(process.cwd(), 'resources', filename);
        const writeStream = fs.createWriteStream(resourcePath);

        return new Promise((resolve, reject) => {
            stream.pipe(writeStream);
            writeStream.on('finish', () => resolve(`/api/resource/${filename}`));
            writeStream.on('error', (err) => reject(err));
        });
    }
}
