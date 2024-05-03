import { users, header } from '../models/users.model.js';

export function getUsers(req, res) {
    res.json(users);
}

export function getUser(req, res) {
    const userId = Number(req.params.id);
    const user = users[userId];
    if (user) {
        res.json(user);
    } else {
        res.sendStatus(404).end();
    }
}

export function postUser(req, res) {
    if (!req.body.name) {
        return res.status(400).json({
            error: 'Missing User Name',
        });
    }

    const newUser = {
        name: req.body.name,
        id: users.length,
    };
    users.push(newUser);
    res.json(newUser);
}

export function getHeader(req, res) {
    res.json(header);
}
