const rateMiddleware = (req, res, next) => {
    const { talk } = req.body;
    const { rate } = talk;
    console.log(rate);
    if (!rate && rate !== 0) {
        res.status(400).send({ message: 'O campo "rate" é obrigatório' });
        console.log('oi');
        } else if (rate < 1 || rate > 5) {
        res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
        } else {
            next();
        }
};

module.exports = rateMiddleware;