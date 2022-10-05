const watchedAtMiddleware = (req, res, next) => {
    const { talk } = req.body;
    const { watchedAt } = talk;
    console.log(watchedAt);
    if (!watchedAt) {
        res.status(400).send({ message: 'O campo "watchedAt" é obrigatório' });
        } else {
            next();
        }
};

module.exports = watchedAtMiddleware;