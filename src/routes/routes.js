const express = require('express');
const { join } = require('path');

// const x = require('../talker.json');
const router = express.Router();

const fs = require('fs').promises;

const read = async () => {
    const path = '../talker.json';
    try {
        const contentFile = await fs.readFile(join(__dirname, path), 'utf-8');
        return JSON.parse(contentFile);
    } catch (error) {
        return null;
    }
};

router.get('/', async (_req, res) => {
    const talkers = await read();
    console.log(talkers);
    res.status(200).json(talkers);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const talkers = await read();
    const thatTalker = talkers.filter((talker) => talker.id === Number(id));
    if (thatTalker.length > 0) {
    res.status(200).json(thatTalker[0]);
    } else {
    res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
    }
});

module.exports = router;