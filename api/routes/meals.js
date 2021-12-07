const express = require('express')
const Meals = require('../models/Meals')
//const { router } = express.Router()

const router = express.Router()
//get cuando es listar y put cuando es actualizar
router.get('/', (req, res) => {
    //Busca todos los elementos de Meals
    Meals.find()
        .exec() //este medoto ejecuta la require la consulta solicitada
        //Aca devolvemos a nuestro cliente lo que el solicitó con código de status 200 de OK
        .then(x => res.status(200).send(x)) //devolvemos una promesa
} )
// get para obtener un listado pero solamente uno en este caso por el id
router.get('/:id', ( req, res) => {
    Meals.findById(req.params.id)
    .exec()//este medoto ejecuta la consulta solicitada
    .then(x => res.status(200).send(x))
})
//Con post cuando queremos crear el elemento
router.post('/', (req, res) => {
    Meals.create(req.body).then(x => res.status(201).send(x))//Creamos elementos y van a estar basados en el body de nuestra petición
    
})
//Con put actualizamos el elemento pero por el id
router.put('/:id', (req, res) => {
    Meals.findOneAndUpdate(req.params.id, req.body)
    .then(() => res.sendStatus(204))
})

router.delete('/:id', (req, res) => {
    Meals.findOneAndDelete(req.params.id).exec().then(() => res.sendStatus(204))
    //Meals.findOneAndDelete(req.params.id).exec().then(() => res.sendStatus(204)).then(() => res.sendStatus(204))
})

module.exports = router