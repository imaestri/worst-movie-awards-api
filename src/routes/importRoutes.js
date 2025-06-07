import express from 'express';
import multer from 'multer';
import importController from '../controllers/importController.js';

const router = express.Router();
const upload = multer({ dest: './uploads/' });

router.post('/csv/upload', upload.single('file'), importController.importCsvHandler);

export default router;
