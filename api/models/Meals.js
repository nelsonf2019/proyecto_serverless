const mongoose = require('mongoose')
//Con esquema modemos armar nuestros modelos con el código
const Schema = mongoose.Schema

//Creamos nuestro modelos
const Meals = mongoose.model('Meal', new Schema({
    name: String,
    desc: String,

}))

module.exports = Meals