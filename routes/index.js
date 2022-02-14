const { Router } = require("express");
const {default:axios} = require("axios")
const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.post("/", (req, res, next) => {


  console.log(req.body.movie)

  axios
    .get(`https://imdb-api.com/en/API/SearchTitle/k_5fodxqeg/${req.body.movie}`)
    .then(movie => console.log(movie.data))

})


module.exports = router;
