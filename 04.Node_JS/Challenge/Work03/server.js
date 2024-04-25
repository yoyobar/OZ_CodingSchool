//? ECMA MODULE PRACTICE
import express from 'express';
import path from 'path';
import { dirname } from 'path';
import usersRouter from './routes/users.router.js';
import postsRouter from './routes/posts.router.js';
import imagesRouter from './routes/images.router.js';
import { fileURLToPath } from 'url';

//? CONST DATA
const PORT = 4000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//? 템플릿 엔진 서버 등록
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

//? public static 요청
app.use('/static', express.static('public'));

//? Body Default Parse 미들웨어
app.use(express.json());

//? Method 시작시간 종료시간 미들웨어
app.use((req, res, next) => {
    const start = Date.now();
    console.log(`Start ${req.method}, ${req.url}`);
    next();

    const diffTime = Date.now() - start;
    console.log(`End ${req.method}, ${req.baseUrl} ${diffTime}ms`);
});

//? imagesRouter에 요청
app.use('/', imagesRouter);

//? usersRouter에 요청
app.use('/users', usersRouter);

//? postsRouter에 요청
app.use('/posts', postsRouter);

//? 서버 가동
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});

//? MVC Model
//! Model, Viewer, Controller, Router
//! Server -> Router -> Controller -> Viewer

//? HOW TO RUN
//! First. npm install & Testing
//! npm run test node 서버 테스트
//! npm run sync nodemon 서버 테스트

//? HOW TO LINK
//! localhost:4000 -> Layout.hbs, images.controller.js (Default)
//! localhost:4000/static -> public/index.html Data
//! localhost:4000/posts -> post.router -> getPost Data
//! localhost:4000/users -> users.router -> getHeader Data
//! localhost:4000/all -> users.router -> getUsers Data
//! localhost:4000/params -> users.router -> getUsers:id Data
