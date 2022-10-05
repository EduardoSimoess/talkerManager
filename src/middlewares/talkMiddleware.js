const talkMiddleware = (req, res, next) => {
    const { talk } = req.body;
    if (!talk) {
    res.status(400).send({ message: 'O campo "talk" é obrigatório' });
    } else {
        next();
    }
};

module.exports = talkMiddleware;