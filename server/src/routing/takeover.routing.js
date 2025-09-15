import express from 'express';
import { addtakeoverentryController, getAlltakeoverentryController } from '../controllers/takeover.controllers.js';

const takeoverRouting = express.Router();

// Routes
takeoverRouting.post('/addtakeoverentry', addtakeoverentryController);
takeoverRouting.get('/getAlltakeoverentry', getAlltakeoverentryController);

export default takeoverRouting;
