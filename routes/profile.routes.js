const router = require("express").Router()
const User = require('./../models/User.model')
const Movie = require("./../models/Movie.model")
const Review = require("../models/Review.model")
const fileUploader = require('../config/cloudinary.config')
const { isLoggedIn, checkRole, check } = require("../middleware/route-guard")
const { isAdmin, isUser, isMod } = require("../utils")
const { default: axios } = require("axios")

const ApiHandler = require("../api-handlers/tombd-handler");
const apiHandler = new ApiHandler()



router.get('/perfil/editar/:user_id', isLoggedIn, (req, res, next) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .then(user => res.render("../views/profile/edit", user))
        .catch(err => next(err))
})


router.post("/perfil/editar/:user_id", fileUploader.single('imageFile'), isLoggedIn, (req, res, next) => {

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


router.post("/perfil/:user_id/borrar", isLoggedIn, (req, res, next) => {



    console.log(req.body)

    User
        .findByIdAndDelete(id)
        .then(() => { res.redirect("/") })
        .catch(error => next(error))
})

router.get('/perfil/:id', isLoggedIn, (req, res, next) => {

    let favoriteMovies = []


    let movieArr = []
    User
        .findById(req.params.id)
        .then((x) => {
            favoriteMovies = x.favoriteMoviesIds
            console.log(favoriteMovies)
            profileUser = x
            isCurrentUser = req.session.currentUser.username === profileUser.username && isAdmin(req.session.currentUser) === false
        })
        .then(() => {
            return apiHandler.getArrofMovies(favoriteMovies)
                .then((response) => {

                    response.forEach((x) => {
                        movieArr.push(x.data)
                    })

                })


        })
        .then(() => {

            res.render('profile/profile', {
                movieArr: movieArr,
                profileUser,
                isCurrentUser,
                isUser: isUser(req.session.currentUser),
                isAdmin: isAdmin(req.session.currentUser),
                isMod: isMod(req.session.currentUser),
            })
        })
        .catch(e => console.log(e))
})


router.post('/perfil/:review_id/borrar', isLoggedIn, (req, res, next) => {
    const { review_id } = req.params

    Review
        .findByIdAndDelete(review_id)
        .then(() => { res.redirect("/perfil") })
        .catch(error => next(error))
})





router.post('/perfil/:id/delete-movie', (req, res, next) => {
    console.log(req.body)
    console.log(req.session.currentUser._id)
    User
        .findByIdAndUpdate(req.session.currentUser._id, { $pull: { "favoriteMoviesIds": req.params.id } })
        .then(() => res.redirect(`/perfil/${req.session.currentUser._id}`))
        .catch(e => console.log(e))

})


module.exports = router
