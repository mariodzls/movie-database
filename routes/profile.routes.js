const router = require("express").Router()
const User = require('./../models/User.model')
const fileUploader = require('../config/cloudinary.config')
const { isLoggedIn, checkRole, check } = require("../middleware/route-guard")
const { isAdmin, isUser, isMod } = require("../utils")
// router.get("/perfil", (req, res, next) => {

//     res.render("../views/profile/profile", { user: req.session.currentUser })
// })


router.get('/perfil/editar/:user_id', isLoggedIn, check, (req, res, next) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .then(user => res.render("profile/edit", user))
        .catch(err => next(err))
})


router.post("/perfil/editar/:user_id", fileUploader.single('imageFile'), isLoggedIn, check, (req, res, next) => {

    const { user_id } = req.params
    const { email, description } = req.body

    User
        .findByIdAndUpdate(user_id, { email, description, profileImg: req.file?.path }, { new: true })
        .then((user) => {
            req.session.currentUser = user
            res.redirect("/perfil")
        })
        .catch(err => next(err))
})


router.post("/perfil/:user_id/borrar", isLoggedIn, checkRole("ADMIN"), (req, res, next) => {

    const { user_id } = req.params

    User
        .findByIdAndDelete(user_id)
        .then(() => { res.redirect("/") })
        .catch(error => next(error))
})

router.get('/perfil', isLoggedIn, (req, res, next) => {

    res.render('profile/profile', {
      user: req.session.currentUser, 
      isUser: isUser(req.session.currentUser),
      isAdmin: isAdmin(req.session.currentUser),
      isMod: isMod(req.session.currentUser),
    })
  })

module.exports = router