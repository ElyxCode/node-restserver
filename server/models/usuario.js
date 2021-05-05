const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Objeto que guarda los roles requeridos para el campo roles.
let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
};

let Schema = mongoose.Schema;


// Creamos un esquema con los atributos que requiren los campos para guardarlos en la base de datos.
let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre en necesario']
    },
    email: {
        type: String,
        unique: true, 
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La constrareña es obligatoria']
    },
    img : {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

// Elimina el campo 'Password' en la impresión del objeto en pantalla. 
// No se mostrará este campo en resultado cuando se guarde un usuario.
usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

// Aplica el plugin en el schema (Mensaje de erro más 'amigable')
usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único'});

// Exporta el esquema usuario
module.exports = mongoose.model('Usuario', usuarioSchema);