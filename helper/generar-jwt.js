const jwt = require('jsonwebtoken');

const generarToken = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(payload, 'Est3MiS3cr8PTe34MXd', {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('Nose pudo generar el token');
            } else {
                resolve(token);
            }
        });

    });
}

module.exports = {
    generarToken
}