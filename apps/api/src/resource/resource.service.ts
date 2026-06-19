import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import path, { join } from 'path';
import * as fs from "fs";

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
}