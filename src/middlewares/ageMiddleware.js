const ageMiddleware = (req, res, next) => {
    const { age } = req.body;
    // console.log(age.length);
    if (!age) {
    res.status(400).send({ message: 'O campo "age" é obrigatório' });
    } else if (age < 18) {
    res.status(400).send({ message: 'A pessoa palestrante deve ser maior de idade' });
    } else {
        next();
    }
};

module.exports = ageMiddleware;