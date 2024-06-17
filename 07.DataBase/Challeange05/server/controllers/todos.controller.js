/* eslint-disable no-undef */
const sql = require('../db.js');

exports.create = (req, res) => {
    const { title, completed } = req.body;

    const query = 'INSERT INTO todos (title, completed) VALUES (?, ?)';
    sql.query(query, [title, completed ? 1 : 0], (err, result) => {
        if (err) {
            return res.status(500).send({ message: err.message });
        }
        res.send({ id: result.insertId, title, completed });
    });
};

exports.findAll = (req, res) => {
    const query = 'SELECT * FROM todos';
    sql.query(query, (err, results) => {
        if (err) {
            return res.status(500).send({ message: err.message });
        }
        const todos = results.map((todo) => ({
            ...todo,
            completed: todo.completed === 1,
        }));
        res.send(todos);
    });
};

exports.update = (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;

    const query = 'UPDATE todos SET title = ?, completed = ? WHERE id = ?';
    sql.query(query, [title, completed ? 1 : 0, id], (err, result) => {
        if (err) {
            return res.status(500).send({ message: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ message: 'Todo not found' });
        }
        res.send({ message: 'Todo updated successfully' });
    });
};

exports.delete = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM todos WHERE id = ?';
    sql.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).send({ message: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ message: 'Todo not found' });
        }
        res.send({ message: 'Todo deleted successfully' });
    });
};
