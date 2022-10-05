const tokenMiddleware = (req, res, next) => {
const token = req.header('authorization');

if (!token) {
    res.status(401).json({ message: 'Token não encontrado' });
} else if (token.length !== 16) {
    res.status(401).json({ message: 'Token inválido' });
} else {
    next();
}
};

module.exports = tokenMiddleware;