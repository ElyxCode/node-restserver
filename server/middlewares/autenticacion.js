
const jwt = require('jsonwebtoken');

// ===================
//  Verificar token
// ===================

let verificarToken = (req, res, next ) => {
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if(err){
            res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'   
                }
            });
        };

        req.usuario = decoded.usuario;
        next();
    });
};

// ====================
//  Verificar AdminRole
// ====================

let verificarAdminRole = (req, res, next) => {

    let usuario = req.usuario;

    // console.log(usuario);

    
    if (usuario.role === 'ADMIN_ROLE'){
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
    }; 
};


module.exports = {
    verificarToken,
    verificarAdminRole
}