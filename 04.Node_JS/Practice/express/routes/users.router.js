import express from 'express';
import { getHeader, getUser, getUsers, postUser } from '../controllers/users.controller.js';

const usersRouter = express.Router();
usersRouter.post('/', postUser);
usersRouter.get('/', getHeader);
usersRouter.get('/all', getUsers);
usersRouter.get('/:id', getUser);

export default usersRouter;
