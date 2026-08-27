import { Request, Response } from 'express';
import prisma from '../../config/prisma';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export class MediaController {

    static async serveMedia(req: Request, res: Response) {
        try {
            // filename comes from regex capture group (index 0)
            const filename = req.params[0];
            if (!filename) return res.status(404).send('File not found');

            // Sanitize filename to prevent directory traversal
            // Remove any '..' sequences and normalize
            const safeFilename = path.normalize(filename).replace(/^(\.\.[\/\\])+/, '');

            const uploadsDir = path.join(__dirname, '../../../uploads');
            const originalFilePath = path.join(uploadsDir, safeFilename);

            if (!fs.existsSync(originalFilePath)) {
                return res.status(404).send('File not found');
            }

            const width = req.query.w ? parseInt(req.query.w as string) : undefined;
            const height = req.query.h ? parseInt(req.query.h as string) : undefined;

            // If no resize needed, serve original
            if (!width && !height) {
                return res.sendFile(originalFilePath);
            }

            // Create thumbnails directory if not exists
            const thumbsDir = path.join(uploadsDir, 'thumbnails');
            if (!fs.existsSync(thumbsDir)) {
                fs.mkdirSync(thumbsDir, { recursive: true });
            }

            // Construct unique thumbnail filename
            // e.g. image_w300_h200.jpg
            const ext = path.extname(safeFilename);
            const name = path.basename(safeFilename, ext);
            const thumbName = `${name}_w${width || 'auto'}_h${height || 'auto'}${ext}`;
            const thumbPath = path.join(thumbsDir, thumbName);

            // Serve cached thumbnail if exists
            if (fs.existsSync(thumbPath)) {
                return res.sendFile(thumbPath);
            }

            // Generate thumbnail
            const transform = sharp(originalFilePath);

            if (width && height) {
                transform.resize(width, height, { fit: 'cover' }); // Crop to aspect ratio
            } else if (width) {
                transform.resize({ width }); // Autoscales height
            } else if (height) {
                transform.resize({ height }); // Autoscales width
            }

            await transform.toFile(thumbPath);
            return res.sendFile(thumbPath);

        } catch (error) {
            console.error('Resize error:', error);
            // Fallback to original if something goes wrong
            const safeFilename = path.normalize(req.params[0] || '').replace(/^(\.\.[\/\\])+/, '');
            const originalPath = path.join(__dirname, '../../../uploads', safeFilename);
            if (fs.existsSync(originalPath)) {
                return res.sendFile(originalPath);
            }
            return res.status(500).send('Error processing image');
        }
    }

    static async uploadMedia(req: Request, res: Response) {
        try {
            if (!req.file) {
                return res.status(400).json({ success: false, message: 'No file uploaded' });
            }

            const { filename, size, mimetype, path: filePath } = req.file;
            // Assuming app is running at port 3000 exposed via ngrok or localhost
            // Construct accessible URL. In prod, this should use process.env.BASE_URL
            const relativePath = filePath.replace(/\\/g, '/').replace('uploads/', ''); // Adjust based on how multer saves relative path

            // Actually multer 'dest' or 'storage' might give full path or relative.
            // Let's rely on what we configure in routes. 
            // If we save to 'uploads/', req.file.path will be 'uploads/filename.ext'.

            const url = `/uploads/${filename}`;

            const media = await prisma.media.create({
                data: {
                    filename,
                    url,
                    type: mimetype.startsWith('image/') ? 'image' : mimetype.startsWith('video/') ? 'video' : 'file',
                    mimeType: mimetype,
                    size,
                    uploadedBy: (req as any).user?.id // Fix: Cast to any to access user property populated by middleware
                }
            });

            res.status(201).json({ success: true, data: media });
        } catch (error: any) {
            // Delete file if db insert fails to keep clean state (optional but good practice)
            if (req.file) {
                fs.unlink(req.file.path, () => { });
            }
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async getMedia(req: Request, res: Response) {
        try {
            const { page = 1, limit = 20 } = req.query;
            const skip = (Number(page) - 1) * Number(limit);

            const [total, media] = await Promise.all([
                prisma.media.count(),
                prisma.media.findMany({
                    skip,
                    take: Number(limit),
                    orderBy: { createdAt: 'desc' },
                    include: { uploader: { select: { fullName: true, email: true } } }
                })
            ]);

            res.status(200).json({
                success: true,
                data: media,
                pagination: {
                    total,
                    page: Number(page),
                    limit: Number(limit),
                    totalPages: Math.ceil(total / Number(limit))
                }
            });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async deleteMedia(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const media = await prisma.media.findUnique({ where: { id } });

            if (!media) {
                return res.status(404).json({ success: false, message: 'Media not found' });
            }

            // Delete from DB
            await prisma.media.delete({ where: { id } });

            // Delete from FS
            const filePath = path.join(__dirname, '../../../uploads', media.filename);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }

            res.status(200).json({ success: true, message: 'Media deleted successfully' });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}
