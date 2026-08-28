import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { MediaController } from './media.controller';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();

// Configure Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Routes
router.post('/upload', authenticate, upload.single('file') as any, MediaController.uploadMedia);
router.get('/', authenticate, MediaController.getMedia);
router.delete('/:id', authenticate, MediaController.deleteMedia);

export default router;
