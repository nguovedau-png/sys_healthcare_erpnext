import {
    Controller,
    Post,
    Get,
    Delete,
    Param,
    UseInterceptors,
    UploadedFile,
    Headers,
    Res,
    HttpStatus,
    HttpException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';

@Controller('files')
export class FileController {
    constructor(
        @Inject('FILE_SERVICE') private readonly fileClient: ClientProxy,
    ) { }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Headers('x-user-id') userId: string,
    ) {
        if (!file) {
            throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
        }
        if (!userId) {
            throw new HttpException('User ID required', HttpStatus.BAD_REQUEST);
        }

        return firstValueFrom(
            this.fileClient.send({ cmd: 'file.upload' }, { file, userId }),
        );
    }

    @Get()
    async getFiles(@Headers('x-user-id') userId: string) {
        if (!userId) {
            throw new HttpException('User ID required', HttpStatus.BAD_REQUEST);
        }

        return firstValueFrom(
            this.fileClient.send({ cmd: 'file.getList' }, userId),
        );
    }

    @Get(':id/download')
    async downloadFile(@Param('id') id: string, @Res() res: Response) {
        const fileId = parseInt(id);
        const fileData = await firstValueFrom(
            this.fileClient.send({ cmd: 'file.getStream' }, fileId),
        );

        if (!fileData) {
            throw new HttpException('File not found', HttpStatus.NOT_FOUND);
        }

        res.setHeader('Content-Type', fileData.mimetype);
        res.setHeader(
            'Content-Disposition',
            `attachment; filename="${fileData.filename}"`,
        );
        res.send(fileData.buffer);
    }

    @Delete(':id')
    async deleteFile(@Param('id') id: string) {
        const fileId = parseInt(id);
        return firstValueFrom(
            this.fileClient.send({ cmd: 'file.delete' }, fileId),
        );
    }
}
