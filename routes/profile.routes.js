const res = require("express/lib/response")
const bcryptjs = require('bcryptjs')
const { isLoggedIn } = require('./../middleware/route-guard')
const router = require("express").Router()
const User = require('./../models/User.model')
const fileUploader = require('../config/cloudinary.config')

router.get("/perfil", (req, res, next) => {

    console.log(req.session.currentUser)
    res.render("../views/profile/profile", { user: req.session.currentUser })
})

router.get('/perfil/editar/:user_id', isLoggedIn, (req, res, next) => {
    const { user_id } = req.params
    User
        .findById(user_id)
        .then(user => { res.render("profile/edit", user) })
        .catch(err => next(err))
})

router.post("/perfil/editar/:user_id", fileUploader.single('imageFile'), (req, res, next) => {
    const { user_id } = req.params
    const { email, description } = req.body
    User
        .findByIdAndUpdate(user_id, { email, description, profileImg: req.file?.path }, { new: true })
        .then((user) => {
            req.session.currentUser = user;
            res.redirect("/perfil") })
        .catch(err => next(err))
})

router.post("/perfil/:user_id/borrar", isLoggedIn, (req, res, next) => {
    const { user_id } = req.params
    User
        .findByIdAndDelete(user_id)
        .then(() => { res.redirect("/") })
        .catch(error => next(error))
})

module.exports = router