// TODO: Encontrar uma maneira de esconder a chave da API
// Usando .env, o Expo Go não carrega
// Usando Constants também não.
const MOVIE_API_KEY =  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MmMxMzNmZTBiYzE0M2QzY2I2NzdiNjA1ZDVkMmY3OSIsIm5iZiI6MTc0NTQ3ODk1Ni4zNTM5OTk5LCJzdWIiOiI2ODA5ZTUyYzhiY2VhNjZhODZhYThhZDgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.UOZ3YBFW_TpYrckulUOeabMRr29izO-_efjhshHDujQ"

const TMDB_API_CONFIG = {
  BASE_URL: "https://api.themoviedb.org",
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${MOVIE_API_KEY}`
  }
};

const fetchMovies = async ({ query }: { query: string }) => {
  const url = query
    ? `${TMDB_API_CONFIG.BASE_URL}/3/search/movie?language=pt-br?query=${encodeURIComponent(query)}`
    : `${TMDB_API_CONFIG.BASE_URL}/3/discover/movie?language=pt-br?sort_by=popularity.desc`;

  const response = await fetch(url, {
    method: 'GET',
    headers: TMDB_API_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(`Falha em fetch filmes. Status: ${response.status}`);
  }

  const data = await response.json();
  
  return data.results;
};

export const fetchMovieDetails = async (
    movieId: string
  ): Promise<MovieDetails> => {
    try {
      const response = await fetch(
        `${TMDB_API_CONFIG.BASE_URL}/3/movie/${movieId}?language=pt-br`,
        {
          method: "GET",
          headers: TMDB_API_CONFIG.headers,
        }
      );
  
      if (!response.ok) {
        throw new Error(`Failed to fetch movie details: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching movie details:", error);
      throw error;
    }
  };

export default fetchMovies;
