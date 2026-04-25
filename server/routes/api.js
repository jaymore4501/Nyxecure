import express from 'express';
import { analyzeUrl, analyzePassword, getStats } from '../controllers/scanController.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes"
});

router.post('/scan/url', apiLimiter, analyzeUrl);
router.post('/scan/password', apiLimiter, analyzePassword);
router.get('/stats', getStats);

export default router;
