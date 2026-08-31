import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma';
import { createReadStream } from 'fs';
import { join } from 'path';
import * as fs from 'fs/promises';
import * as sharp from 'sharp';

@Injectable()
export class FileManagementService {
  constructor(private prisma: PrismaService) { }


  async uploadFile(file: Express.Multer.File, userId: string) {
    const { filename, path, mimetype, size } = file;
    let thumbnailPath: string | null = null;

    // Generate thumbnail for images
    if (mimetype.startsWith('image/')) {
      try {
        const thumbFilename = `thumb_${filename}`;
        const thumbPath = join(process.cwd(), 'uploads', thumbFilename); // Assuming uploads dir
        // Ensure uploads dir is correct relative to path, but effectively:
        // We need to resolve the directory where `path` is located.
        const uploadDir = join(path, '..');
        const finalThumbPath = join(uploadDir, thumbFilename);

        await sharp(path)
          .resize(200)
          .toFile(finalThumbPath);

        thumbnailPath = finalThumbPath;
      } catch (error) {
        console.error('Failed to generate thumbnail:', error);
      }
    }

    return this.prisma.file.create({
      data: {
        filename,
        path,
        thumbnailPath,
        mimetype,
        size,
        userId,
      },
    });
  }

  async getFileStream(fileId: number) {
    const file = await this.prisma.file.findUnique({ where: { id: fileId } });
    if (!file) {
      throw new Error('File not found');
    }
    return createReadStream(join(process.cwd(), file.path));
  }

  async deleteFile(fileId: number) {
    const file = await this.prisma.file.findUnique({ where: { id: fileId } });
    if (!file) {
      throw new Error('File not found');
    }
    await fs.unlink(join(process.cwd(), file.path));
    return this.prisma.file.delete({ where: { id: fileId } });
  }

  async getFilesList(userId: string) {
    return this.prisma.file.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
