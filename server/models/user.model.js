const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const EsquemaUsuario = new mongoose.Schema( {
    firstName: {
        type: String,
        required: [true, "nombre obligarito"]
    },
    lastName: {
        type: String,
        required: [true, "Apellido obligarito"]
    },
    email: {
        type: String,
        required: [true, "Email obligarito"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Ingrese email valido"
        },
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password obligarito"],
        minlength: [8, "Password debe tener minimo 8 caracteres"]
    }
}, {timestamps: true,  versionKey: false})

// se realiza cuando no queremos guardarlo en la DB
EsquemaUsuario.virtual('confirmPassword')
    .get( () => this._confirmPassword )
    .set( value => this._confirmPassword = value)

// Se hace antes de validar el esquema usuario
EsquemaUsuario.pre('validate', function(next){
    if(this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Las contrasenas no coinciden');
    }

    next();
})

//Antes de guardar usuario, encriptamos la contrasenia
EsquemaUsuario.pre('save', function(next){
    bcrypt.hash(this.password, 10)
    .then(hash => {
        this.password = hash;
        next();
    });
});

const Usuario = mongoose.model("usuarios", EsquemaUsuario);
module.exports = Usuario;

//npm install bcrypt
//npm install jsonwebtoken cookie-parser