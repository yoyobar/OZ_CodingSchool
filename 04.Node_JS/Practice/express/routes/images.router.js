import express from 'express';
import getImage from '../controllers/images.controller.js';

const imagesRouter = express.Router();
imagesRouter.get('/', getImage);

export default imagesRouter;
