import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import path, { join } from 'path';
import * as fs from "fs";
import { format } from 'date-fns';
import { Readable } from 'stream';

@Injectable()
export class ResourceService implements OnModuleInit {
    private readonly logger = new Logger(ResourceService.name);

    async onModuleInit() {
        const resourcePath = path.resolve(process.cwd(), "resources");

        try {
            fs.mkdirSync(resourcePath, { recursive: true });
            this.logger.log("Folder to store resources has been successfully created or already exists");
        } catch(error) {
            this.logger.error(
                `Cannot create folder to store resources at ${resourcePath}`,
                error.stack
            );
        }
    }

    getByFilename(filename: string) {
        const filePath = join(process.cwd(), "resources", filename);

        if(!fs.existsSync(filePath)) throw new NotFoundException(`File not found : ${filename}`);

        return fs.createReadStream(filePath);
    }

    async saveImage(stream: Readable, filename: string): Promise<string> {
        const filenameWithoutExtension = format(new Date(), "yyyyMMddHHmmss");
        const parts = filename.split(".");
        const newFilename = `${filenameWithoutExtension}.${parts[parts.length - 1]}`;
        const resourcePath = join(process.cwd(), "resources", newFilename);
        const writeStream = fs.createWriteStream(resourcePath);

        return new Promise((resolve, reject) => {
            stream.pipe(writeStream);
            writeStream.on("finish", () => resolve(`/api/resource/${newFilename}`));
            writeStream.on("error", (err) => reject(err));
        });
    }
}