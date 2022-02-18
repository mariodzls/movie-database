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

    getArrofMovies(arr) {

        let endpoints = []


        arr.forEach((id) => {
            let newUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=1bcaa0ba2b7c234cefead395958d590e`
            endpoints.push(newUrl)
        })


        return Promise.all(endpoints.map((endpoint) => this.axios.get(endpoint)))
    }

}

module.exports = ApiHandler