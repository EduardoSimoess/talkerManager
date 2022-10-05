const express = require('express');
const { join } = require('path');

// const x = require('../talker.json');
const router = express.Router();

const fs = require('fs').promises;

const emailMiddleware = require('../middlewares/emailMiddleware');
const passwordMiddleware = require('../middlewares/passwordMiddleware');
const nameMiddleware = require('../middlewares/nameMiddleware');
const ageMiddleware = require('../middlewares/ageMiddleware');
const talkMiddleware = require('../middlewares/talkMiddleware');
const watchedAtMiddleware = require('../middlewares/watchedAtMiddleware');
const watchedAtMiddlewareDate = require('../middlewares/watchedAtMiddlewareDate');
const rateMiddleware = require('../middlewares/rateMiddlewares');
const tokenMiddleware = require('../middlewares/tokenMiddleware');

const read = async () => {
    const path = '../talker.json';
    try {
        const contentFile = await fs.readFile(join(__dirname, path), 'utf-8');
        return JSON.parse(contentFile);
    } catch (error) {
        return null;
    }
};

async function write(newPearson) {
    const path = '../talker.json';
    try {
        const string = JSON.stringify(newPearson);
        const contentFile = await fs.writeFile(join(__dirname, path), string);
        return contentFile;
    } catch (error) {
        return null;
    }
} 

router.get('/talker', async (_req, res) => {
    const talkers = await read();
    console.log(talkers);
    res.status(200).json(talkers);
});

router.get('/talker/:id', async (req, res) => {
    const { id } = req.params;
    const talkers = await read();
    const thatTalker = talkers.filter((talker) => talker.id === Number(id));
    if (thatTalker.length > 0) {
    res.status(200).json(thatTalker[0]);
    } else {
    res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
    }
});

router.post('/login', emailMiddleware, passwordMiddleware, (_req, res) => {
        const tokenInit = Math.random().toString(16).substr(2)
         + Math.random().toString(16).substr(2);
        let token;
        if (tokenInit.length === 26) {
            token = tokenInit.substring(10);
        } else {
            token = tokenInit.substring(9);
        }
        res.status(200).send({ token });
});

router.post('/talker', tokenMiddleware, nameMiddleware, ageMiddleware, talkMiddleware, 
watchedAtMiddleware, watchedAtMiddlewareDate, rateMiddleware, async (req, res) => {
    const { name, age, talk } = req.body;
    const talker = await read();
    const { id } = talker[talker.length - 1];
    const newId = Number(id) + 1;
    const newTalker = {
        name,
        age,
        id: newId,
        talk,
    };
    talker.push(newTalker);

    const teste = await write(talker);
    console.log(teste);
    console.log(talker);
    
    res.status(201).json(newTalker);
});

module.exports = router;