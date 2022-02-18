const { Router } = require("express");
const { default: axios } = require("axios")
const router = require("express").Router();
const Review = require('./../models/Review.model')
const { isLoggedIn, checkRole } = require('../middleware/route-guard.js');


const ApiHandler = require("../api-handlers/tombd-handler");
const User = require("../models/User.model");
const { isAdmin, isUser, isMod } = require("../utils/index")
const apiHandler = new ApiHandler()



router.get("/", (req, res, next) => res.render("index"))


router.post("/", (req, res, next) => {

  const search = req.body

  axios
    .get(`https://api.themoviedb.org/3/search/movie?api_key=1bcaa0ba2b7c234cefead395958d590e&query=~${search.movie}`)
    .then(movie => {
      const movies = movie.data
      res.render("../views/media/films", movies.results)
    })
})


router.get("/peliculas", (req, res, next) => {

  apiHandler.getPopularMovies()
    .then((response) => {
      const movies = response.data
      res.render("../views/media/films", movies.results)
    })
})


router.get("/peliculas/:id", (req, res, next) => {

  let reviews = {}

  Review
    .find({ movieId: `${req.params.id}` })
    .then(reviewsFound => reviews = reviewsFound)

  axios
    .get(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=1bcaa0ba2b7c234cefead395958d590e`)
    .then((movieDetails) => {
      movieDetails = movieDetails.data
      axios
        .get(`https://api.themoviedb.org/3/movie/${req.params.id}/credits?api_key=1bcaa0ba2b7c234cefead395958d590e`)
        .then(credits => {
          credits = credits.data
          const limCredits = credits.cast.slice(0, 6)
          res.render("media/film-details", { movieDetails, limCredits, reviews, isAdmin: isAdmin(req.session.currentUser) })
        })
    })
})



router.post("/peliculas/:id", (req, res, next) => {



  User
    .findByIdAndUpdate(req.session.currentUser._id, { $push: { "favoriteMoviesIds": req.params.id } }, { new: true })
    .then(x => console.log(x))
  res.redirect(`/peliculas/${req.params.id}`)

})


router.get("/actor/:id", (req, res, next) => {

  const { id } = req.params

  axios
    .get(`https://api.themoviedb.org/3/person/${id}?api_key=1bcaa0ba2b7c234cefead395958d590e&language=en-US`)
    .then((actor) => {
      axios
        .get(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=1bcaa0ba2b7c234cefead395958d590e&language=en-US`)
        .then((credits) => {
          actor = actor.data
          credits = (credits.data.cast)
          res.render("../views/media/actor", { actor, credits })
        })
    })
})


router.get("/peliculas/:id/create-review", (req, res, next) => {

  const movieId = req.params
  const { currentUser } = req.session

  res.render("../views/media/create-review-form", { movieId, currentUser })
})


router.post("/peliculas/:id/create-review", (req, res, next) => {

  let { rating, text, userId, movieId, } = req.body
  const username = req.session.currentUser.username

  Review
    .create({ rating, text, userId, movieId, username })
    .then(() => res.redirect(`/peliculas/${req.params.id}`))
    .catch(err => console.log(err))
})


router.post("/peliculas/:reviews_id/borrar", isLoggedIn, checkRole("ADMIN"), (req, res, next) => {
  let { reviews_id } = req.params

  Review
    .findByIdAndDelete(reviews_id)
    .then(() => { res.redirect("/peliculas") })
    .catch(error => next(error))
})

module.exports = router;