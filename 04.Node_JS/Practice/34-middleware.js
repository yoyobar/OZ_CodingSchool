const express = require('express');

// 상수
const PORT = 4000;

const users = [
    {
        id: 0,
        name: 'jack',
    },
    {
        id: 1,
        name: 'jane',
    },
];

const app = express();
//TODO : 미들웨어
app.use((req, res, next) => {
    const start = Date.now();
    console.log(`${req.method}, ${req.url}`);
    next();
    //? 메인테스크 처리후 다시 뒤로 돌아옴
    const diffTime = Date.now() - start;
    console.log(`${req.method}, ${req.url} ${diffTime}ms`);
});

//TODO : user와 params 데이터
app.get('/users', (req, res) => {
    res.json(users);
});
app.get('/users/:id', (req, res) => {
    const userId = Number(req.params.id);
    const user = users[userId];
    if (user) {
        res.json(user);
    } else {
        res.sendStatus(404).end();
    }
});

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});
