const emailMiddleware = (req, res, next) => {
    const { email } = req.body;
    if (!email) {
    res.status(400).send({ message: 'O campo "email" é obrigatório' });
    } else if (!email.includes('@')) {
    res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    next();
};

module.exports = emailMiddleware;