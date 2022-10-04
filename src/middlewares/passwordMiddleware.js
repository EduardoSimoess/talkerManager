const passwordMiddleware = (req, res, next) => {
    const { password } = req.body;
    if (!password) {
    res.status(400).send({ message: 'O campo "password" é obrigatório' });
    } else if (password.length < 6) {
    res.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    next();
};

module.exports = passwordMiddleware;