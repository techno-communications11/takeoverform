import express from 'express';
import takeoverRouting from './takeover.routing.js';

const routing= express.Router();


routing.use('/takeover',takeoverRouting)

export default routing;