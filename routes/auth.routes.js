const res = require("express/lib/response")
const bcryptjs = require('bcryptjs')

const User = require('./../models/User.model')
const saltRounds = 10

const router = require("express").Router()

router.get("/registro", (req, res, next) => 
    res.render("auth/sing-up")
)

router.post("/registro", (req,res,next) => {
    const {username, email, password, description} = req.body

    bcryptjs
    .genSalt(saltRounds)
    .then(salt => bcryptjs.hash(password, salt))
    .then(hashedPassword => {
      console.log('El hash a crear en la BBDD es', hashedPassword)
      return User.create({ username, email, password: hashedPassword, description })
    })
    .then(createdUser => res.redirect('/perfil'))
    .catch(error => next(error))
})

router.get("/perfil", (req, res, next) => {
    res.render("profile")
})

module.exports = router