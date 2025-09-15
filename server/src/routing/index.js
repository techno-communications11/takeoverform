import express from 'express';
import takeoverRouting from './takeover.routing.js';

const router = express.Router();

// Use only relative paths
router.use('/takeover', takeoverRouting);

export default router;
