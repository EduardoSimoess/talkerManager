const watchedAtMiddlewareDate = (req, res, next) => {
    const { talk } = req.body;
    const { watchedAt } = talk;
    const dateArray = watchedAt.split('/');
    const base = [2, 2, 4];
    if (dateArray.length !== 3) {
        res.status(400)
        .send({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    } else if (dateArray.length === 3) {
        const lengthArray = [dateArray[0].length, dateArray[1].length, dateArray[2].length];
        const boll = lengthArray.every((num, i) => num === base[i]);
        if (!boll) {
            res.status(400)
        .send({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
        } else {
            next();
        }
    }
};

module.exports = watchedAtMiddlewareDate;