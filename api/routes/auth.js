
const express = require('express')
const Users = require('../models/Users')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const { isAuthenticated } = require('../auth')
//const { router } = express.Router()

const router = express.Router()
//CREAMOS ENDPOINT PARA REGISTRAR NUESTROS USUARIOS y recibe tres argumentos
const signToken = (_id) => {
    //Sirve para encriptar los id de los usuarios
    return jwt.sign({ _id }, 'mi-secreto', {
        expiresIn: 60 * 60 * 24 * 365,
    })
}
router.post('/register', (req, res) => {
    const { email, password } = req.body
    //Encryptamos los datos para que no pueda ser hackeado
    crypto.randomBytes(16, (err, salt) => {
        const newSalt = salt.toString('base64')
        crypto.pbkdf2(password, newSalt, 10000, 64, 'sha1', (err, key) => {
            //Se transforma en un String en base 64
            const encryptedPassword = key.toString('base64')
            //Llamamos al usuario si existe
            Users.findOne({ email }).exec()
                 .then(user => {
                     if (user) {
                         return res.send('Un usuario ya existe')
                     }
                     Users.create({
                         email,
                         password: encryptedPassword,
                         salt: newSalt,
                     }).then(() => {
                         res.send('usuario creado con exito')
                     })
                 })
        })
    })
})

router.post('/login', (req, res) => {
    const { email, password } = req.body
    Users.findOne({ email }).exec()
        .then(user => {
            if(!user) {
                return res.send('Usuario y/o contraseña incorrecta')
            }
            crypto.pbkdf2(password, user.salt, 10000, 64, 'sha1', (err, key) => {
                //toma la contraseña encriptada y la pasa a un string
                const encryptedPassword = key.toString('base64')
                if(user.password === encryptedPassword) {
                    //El signToken se encarga de encriptar la llave user._id
                    const token = signToken(user._id)   
                    return res.send({ token })
                }
                return res.send('usuario y/o contraseña incorrecta')
            })
        })
})

router.get('/me', isAuthenticated, (req, res) => {
    //Envia el usuario completoS
    res.send(req.user)
})

module.exports = router