const { Router } = require("express");
const { default: axios } = require("axios")
const router = require("express").Router();
const Review = require('./../models/Review.model')

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.post("/", (req, res, next) => {


  const search = req.body


  axios
    .get(`https://api.themoviedb.org/3/search/movie?api_key=1bcaa0ba2b7c234cefead395958d590e&query=~${search.movie}`)

    .then(movie => {

      const movies = movie.data
      console.log(movies)


      res.render("../views/media/films", movies.results)
    })

})


router.get("/peliculas", (req, res, next) => {

  axios
    .get("https://api.themoviedb.org/3/movie/popular?api_key=1bcaa0ba2b7c234cefead395958d590e")
    .then((movie) => {

      movies = movie.data

      res.render("../views/media/films", movies.results)

    })


})

router.get("/peliculas/:id", (req, res, next) => {
  const requ = req.params.id
  let reviews = {}
  Review
    .find({ movieId: `${req.params.id}` })
    .then(reviewsFound => reviews = reviewsFound)
  //await MyModel.find({ name: 'john', age: { $gte: 18 } }).exec();


  axios
    .get(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=1bcaa0ba2b7c234cefead395958d590e`)
    .then((movieDetails) => {
      movieDetails = movieDetails.data
      axios
        .get(`https://api.themoviedb.org/3/movie/${req.params.id}/credits?api_key=1bcaa0ba2b7c234cefead395958d590e`)
        .then(credits => {
          credits = credits.data
          const limCredits = credits.cast.slice(0, 6)

          res.render("../views/media/film-details", { movieDetails, limCredits, reviews })
        })
    })
})

router.get("/actor/:id", (req, res, next) => {
  const id = req.params.id
  axios
    .get(`https://api.themoviedb.org/3/person/${id}?api_key=1bcaa0ba2b7c234cefead395958d590e&language=en-US`)
    .then((actor) => {
      axios
        .get(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=1bcaa0ba2b7c234cefead395958d590e&language=en-US`)
        .then((credits) => {
          actor = actor.data
          credits = (credits.data.cast)
          console.log(credits)
          res.render("../views/media/actor", { actor, credits })
        })
    })
})

router.get("/peliculas/:id/create-review", (req, res, next) => {
  const movieId = req.params
  console.log(req.params)

  const currentUser = req.session.currentUser


  res.render("../views/media/create-review-form", { movieId, currentUser })



})

router.post("/peliculas/:id/create-review", (req, res, next) => {
  let { rating, text, userId, movieId } = req.body

  console.log(req.body)
  console.log(rating, text, userId, movieId)
  Review
    .create({ rating, text, userId, movieId })
    .then(() => console.log("creation is a success"))
    .catch(err => console.log(err))
})







module.exports = router;