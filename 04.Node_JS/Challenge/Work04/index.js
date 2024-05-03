import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import posts from './posts.js';

//? CONST
const PORT = 4000;
const app = express();
const secretKey = 'secret';
const refreshSecretKey = 'refresh';

//? Template DB
let info = [];
let refreshTokenCheck = [];

//? Parser MiddleWare
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//? POST
app.post('/login', (req, res) => {
    const user = req.body;

    //? TOKEN
    const accessToken = jwt.sign(user, secretKey, { expiresIn: '30s' });
    const refreshToken = jwt.sign(user, refreshSecretKey, { expiresIn: '1d' });

    //? Template DB SAVE
    refreshTokenCheck.push(refreshToken);
    info = Object.values(user)[0];

    //? Cookies
    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
    });

    //? Response
    res.json({ accessToken: accessToken });
});

//? GET POST
app.get('/posts', authMiddleware, (req, res) => {
    res.json(posts);
});

//? Verify MiddleWare
function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

//? REFRESH TOKEN VERIFICATION
app.get('/refresh', (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(403);

    const refreshToken = cookies.jwt;
    if (!refreshTokenCheck.includes(refreshToken)) return res.sendStatus(403);

    jwt.verify(refreshToken, refreshSecretKey, (err, user) => {
        if (err) return res.sendStatus(403);

        const accessToken = jwt.sign({ username: info }, secretKey, { expiresIn: '30s' });
        res.json({ accessToken });
    });
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});

//TODO
//! 실제 DB가 없어서 가상의 DB와 옮기는 방식으로 설계했습니다.
//! 실제로 작동하는데는 지장이없지만, 보안상 문제가 많은 방식입니다.
//! 유효시간 30초, 30초후 게시글 사라짐
//! 갱신시간 30초
//! 리프레시토큰 지속 시간 1일
