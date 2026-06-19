import { BadRequestException } from "@nestjs/common";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { diskStorage } from "multer"
import { extname } from "path";

export const getMulterOptions = (): MulterOptions => {
    return {
        storage: diskStorage({
            destination: "./resources",
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
                const ext = extname(file.originalname);
                callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
            }
        }),
        fileFilter: (req, file, callback) => {
            if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
                return callback(new BadRequestException('Resource should be an image'), false);
            }

            callback(null, true);
        },
        limits: {
            fileSize: 10 * 1024 * 1024
        }
    }
}
