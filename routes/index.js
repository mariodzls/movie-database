const { Router } = require("express");
const { default: axios } = require("axios")
const router = require("express").Router();

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
  axios
    .get(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=1bcaa0ba2b7c234cefead395958d590e`)
    .then((movieDetails) => {
      movieDetails = movieDetails.data
      axios
        .get(`https://api.themoviedb.org/3/movie/${req.params.id}/credits?api_key=1bcaa0ba2b7c234cefead395958d590e`)
        .then(credits => {
          credits = credits.data
          const limCredits = credits.cast.slice(0, 6)
          console.log(credits.cast)
          res.render("../views/media/film-details", { movieDetails, limCredits })
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








module.exports = router;