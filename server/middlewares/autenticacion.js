const jwt = require('jsonwebtoken');

// ========================
// Verificar token
// ========================

let verificacionToken = ( req, res, next ) => {

    let token = req.get('token'); // token or authorization

    jwt.verify( token, process.env.SEED, (err, decoded) => {

        if( err ) {
            return res.status(401).json({
                ok: false,
                err:{
                    message: 'Token no valido'
                }
            });
        };

        req.usuario = decoded.usuario;
        next();

    });

};

// ========================
// Verificar AdminRole
// ========================

let verificaAdmin_Role = ( req, res, next ) => {

    let usuario = req.usuario;

    if( usuario.role === 'ADMIN_ROLE' ) {
        next();
    }else{

        return res.status(403).json({
            rol: usuario.email,
            ok: false,
            err:{
                message: 'El usuario no es administrador'
            }
        });

    }

}

module.exports = {
    verificacionToken,
    verificaAdmin_Role
}