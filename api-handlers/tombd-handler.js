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
        let isOk = 0

        arr.forEach((id) => {
            let newUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=1bcaa0ba2b7c234cefead395958d590e`
            endpoints.push(newUrl)
        })
        const arrOfMovies = []

        return Promise.all(endpoints.map((endpoint) => this.axios.get(endpoint)))
        // .then((x) => arrOfMovies.push(x.data))
        // .then((responses) => isOk = 1)
        // .catch((e) => isOk = 1)


        // while (isOk === 0) {

        //     console.log("gonzalo")


        // }

        return arrOfMovies







        //  // In our component, we have to save both data in our state using the useState hook
        //  const [followers, setFollowers] = useState([])
        //  const [followings, setFollowing] = useState([])

        //  const getGithubData = () => {
        //      let endpoints = [
        //          'https://api.github.com/users/ejirocodes',
        //          'https://api.github.com/users/ejirocodes/repos',
        //          'https://api.github.com/users/ejirocodes/followers',
        //          'https://api.github.com/users/ejirocodes/following'
        //      ];
        //      Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(([{ data: user }, { data: repos }, { data: followers }, { data: followings }]) => {
        //          setFollowers(followers)
        //          setFollowing(followings)
        //      });
        //  }
    }

}

module.exports = ApiHandler