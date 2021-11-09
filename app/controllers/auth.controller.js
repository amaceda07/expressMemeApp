const jwt = require('jsonwebtoken');

// as middleware
exports.validate = (req, res, next) => {
    const token = req.headers['access-token'];

    if (token) {
        jwt.verify(token, 'secret_this_should_be_longer', (err, decoded) => {
            if (err) {
                return res.json({ mensaje: 'Token inválida' });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.send({
            mensaje: 'Token no existe.'
        });
    }
};


