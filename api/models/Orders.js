const mongoose = require('mongoose')
//const { Schema } = require('./Meals')
//Con esto crearmos nuestro modelo de ordenes 
//nuestro modelo de comida 
const Schema = mongoose.Schema;


const Orders = mongoose.model('Order', new Schema({
    meal_id: { type:Schema.Types.ObjectId, ref: 'Meal' },
    user_id: String, 
}))

module.exports = Orders