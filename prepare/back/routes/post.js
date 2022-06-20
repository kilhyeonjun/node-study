const express = require('express');

const router = express.Router();

app.post('/', (req, res) => {
    res.json({ id: 1, content: 'hello' });
});

app.delete('/', (req, res) => {
    res.json({ id: 1 });
});

module.exports = router;