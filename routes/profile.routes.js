const router = require("express").Router()
const User = require('./../models/User.model')
const Movie = require("./../models/Movie.model")
const fileUploader = require('../config/cloudinary.config')
const { isLoggedIn, checkRole, check } = require("../middleware/route-guard")
const { isAdmin, isUser, isMod } = require("../utils")
const { default: axios } = require("axios")

const ApiHandler = require("../api-handlers/tombd-handler");
const Review = require("../models/Review.model")

const apiHandler = new ApiHandler()



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

    const favoriteMovies = req.session.currentUser.favoriteMoviesIds
    let movieArr = []

    apiHandler.getArrofMovies(favoriteMovies)
        .then((response) => {
            response.forEach((x) => {
                movieArr.push(x.data)
            })
        })
        .then(() => res.render('profile/profile', {
            movieArr,
            user: req.session.currentUser,
            isUser: isUser(req.session.currentUser),
            isAdmin: isAdmin(req.session.currentUser),
            isMod: isMod(req.session.currentUser),
        }))
})


router.post('/perfil/:review_id/borrar', isLoggedIn, (req, res, next) => {
    const { review_id } = req.params

    Review
        .findByIdAndDelete(review_id)
        .then(() => { res.redirect("/perfil") })
        .catch(error => next(error))
})


module.exports = router
