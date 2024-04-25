import express from 'express';
import getPost from '../controllers/posts.controller.js';

const postsRouter = express.Router();
postsRouter.get('/', getPost);

export default postsRouter;
