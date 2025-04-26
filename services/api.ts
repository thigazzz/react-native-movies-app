const TMDB_API_CONFIG = {
    BASE_URL: "https://api.themoviedb.org",
    API_KEY: process.env.MOVIE_API_KEY,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.MOVIE_API_KEY}`
    }
}

const fetchMovies = async ({query}: {query: string}) => {
    const url = query
        ? `${TMDB_API_CONFIG.BASE_URL}/3/discover/movie?query=${encodeURIComponent(query)}`
        : `${TMDB_API_CONFIG.BASE_URL}/3/discover/movie?sort_by=popularity.desc`

    const response = await fetch(url, {
        method: 'GET',
        headers: TMDB_API_CONFIG.headers
    })

    if (!response.ok) {
        // @ts-ignore
        throw new Error('Falha em fetch filmes. ', response.statusText)
    }

    const data = await response.json()
    console.log("aaaaaaaaaaaaaaaaaaaaaa")
    console.log(data)

    return data.results

}

export default fetchMovies