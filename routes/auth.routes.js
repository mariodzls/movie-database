const res = require("express/lib/response")
const bcryptjs = require('bcryptjs')
const fileUploader = require('../config/cloudinary.config')
const User = require('./../models/User.model')
const app = require("../app")
const saltRounds = 10

const router = require("express").Router()

router.get("/registro", (req, res, next) =>
    res.render("auth/sign-up")
)

router.post("/registro", fileUploader.single('imageFile'), (req, res, next) => {
    const { username, email, password, description, profileImg } = req.body

    bcryptjs
        .genSalt(saltRounds)
        .then(salt => bcryptjs.hash(password, salt))
        .then(hashedPassword => {
            console.log('El hash a crear en la BBDD es', hashedPassword)
            return User.create({ username, email, password: hashedPassword, description, profileImg: req.file?.path })
        })
        .then(createdUser => res.redirect('/iniciar-sesion'))
        .catch(error => next(error))
})

router.get("/iniciar-sesion", (req, res, next) => {
    res.render("auth/sign-in")
})

router.post("/iniciar-sesion", (req, res, next) => {
    const { username, password } = req.body

    if (username.length === 0 || password.length === 0) {
        res.render('auth/sign-in', { errorMessage: 'Por favor, rellena todos los campos' })
        return
    }

    User
        .findOne({ username })
        .then(user => {
            if (!user) {
                res.render('auth/sign-in', { errorMessage: 'Nombre de usuario no registrado en la Base de Datos' })
                return
            } else if (bcryptjs.compareSync(password, user.password) === false) {
                res.render('auth/sign-in', { errorMessage: 'La contraseña es incorrecta' })
                return
            } else {
                req.session.currentUser = user
                req.app.locals.currentUser = user

                res.redirect(`/perfil/${req.session.currentUser.id}`)
            }
        })
})

module.exports = router