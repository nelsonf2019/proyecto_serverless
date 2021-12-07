const express = require('express')
const Orders = require('../models/Orders')
const { isAuthenticated, hasRoles } = require('../auth') //importamos

//const { router } = require('..')

const router = express.Router()
//get cuando es listar y put cuando es actualizar
router.get('/', (req, res) => {
    //Busca todos los elementos de Meals
    Orders.find()
        .exec() //este medoto ejecuta la consulta solicitada
        //Aca devolvemos a nuestro cliente lo que el solicitó con código de status 200 de OK
        .then(x => res.status(200).send(x)) //devolvemos una promesa
} )
// get para obtener un listado pero solamente uno en este caso por el id
router.get('/:id', ( req, res) => {
    Orders.findById(req.params.id)
    .exec()//este medoto ejecuta la consulta solicitada
    .then(x => res.status(200).send(x))
})
//Con post para crear una orden
router.post('/', isAuthenticated, (req, res) => {
    const {_id} = req.user
    Orders.create({ ...req.body, user_id: _id }).then(x => res.status(201).send(x))//Creamos elementos y van a estar basados en el body de nuestra petición
    
})
//Con put actualizamos el elemento pero por el id
router.put('/:id', isAuthenticated, hasRoles(['admin','user']), (req, res) =>{
    Orders.findOneAndUpdate(req.params.id, req.body)
    .then(() => res.sendStatus(204))
})

router.delete('/:id', isAuthenticated, hasRoles('user'), (req, res) =>{
    Orders.findOneAndDelete(req.params.id).exec().then(() => res.sendStatus(204))
    
})

module.exports = router