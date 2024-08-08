const base64Decode = (str) => Buffer.from(str, 'base64').toString('ascii');

module.exports = function (req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = base64Decode(token);
        const [userId, role] = decoded.split(':');
        req.user = { id: userId, role };
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
