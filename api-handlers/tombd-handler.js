const axios = require('axios')

class ApiHandler {

    constructor() {
        this.axios = axios.create({
            baseURL: 'https://api.themoviedb.org/3'
        })
    }


    getPopularMovies() {
        return this.axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=1bcaa0ba2b7c234cefead395958d590e`)

    }

}

module.exports = ApiHandler