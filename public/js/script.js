document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("movie-database JS imported successfully!");
    axios
    .get("https://imdb-api.com/en/API/SearchTitle/k_5fodxqeg")
    .then(movie => console.log(movie.data))
    .catch(err => console.log(err))
  },
  false
);

