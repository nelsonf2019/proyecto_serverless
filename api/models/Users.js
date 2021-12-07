const mongoose = require('mongoose')
//Con esquema podemos armar nuestros modelos con el código
const Schema = mongoose.Schema

//Creamos nuestro modelos
const Users = mongoose.model('User', new Schema({
    email: String,
    password: String,
    salt: String,
    role: {type: String, default: 'user' } //admin
}))

module.exports = Users