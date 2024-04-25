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
app.get('/users', (req, res) => {
    res.json(users);
});
app.get('/users/:id', (req, res) => {
    const userId = Number(req.params.id);
    const user = users[userId];
    if (user) {
        res.json(user);
    } else {
        res.sendStatus(404);
    }
});

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});
