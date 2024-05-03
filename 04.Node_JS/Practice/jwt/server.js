const cookieParser = require('cookie-parser');
const express = require('express');
const jwt = require('jsonwebtoken');

//? CONSTANT
const app = express();
const secretText = 'superSecret';
const refreshSecretText = 'superSuperSecret';
const PORT = 4000;
let refreshTokens = [];

const posts = [
    {
        userName: 'John',
        title: 'Post 1',
    },
    {
        userName: 'Pike',
        title: 'Post 2',
    },
];

//요청 파싱을 위한 미들웨어
app.use(express.json());
app.use(cookieParser());

//? POST 요청
app.post('/login', (req, res) => {
    const userName = req.body.userName;
    const user = { name: userName };

    //? Access 토큰 생성 payload, secretKey
    const accessToken = jwt.sign(user, secretText, { expiresIn: '30s' });
    res.json({ accessToken: accessToken });

    //? Refresh 토큰 생성 payload, secretKey
    const refreshToken = jwt.sign(user, refreshSecretText, { expiresIn: '1d' });

    refreshTokens.push(refreshToken);
    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
    });
});

//? GET 요청
app.get('/posts', authMiddleware, (req, res) => {
    res.json(posts);
});

//? 토큰 검증 미들웨어
function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    //verify
    jwt.verify(token, secretText, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

app.get('/refresh', (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(403);

    const refreshToken = cookies.jwt;
    if (!refreshToken.includes(refreshToken)) return res.sendStatus(403);

    jwt.verify(refreshToken, refreshSecretText, (err, user) => {
        if (err) return res.sendStatus(403);

        const accessToken = jwt.sign({ name: user.name }, secretText, { expiresIn: '30s' });
        res.json({ accessToken });
    });
});

//? 서버 가동
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
