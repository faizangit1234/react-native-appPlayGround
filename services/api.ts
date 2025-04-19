export const OMDB_CONFIG = {
    BASE_URL: 'https://www.omdbapi.com/',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY || 'ac19dd2b',
  };
  
  export const fetchMovies = async ({ query }: { query: string }) => {
    const popularQuery = 'Avengers'; // Simulated popular
    const totalPages = 5;
    const allMovies: any[] = [];
  
    for (let page = 1; page <= totalPages; page++) {
      const endpoint = query
        ? `${OMDB_CONFIG.BASE_URL}?apikey=${OMDB_CONFIG.API_KEY}&t=${encodeURIComponent(query)}`
        : `${OMDB_CONFIG.BASE_URL}?apikey=${OMDB_CONFIG.API_KEY}&s=${popularQuery}&page=${page}`;
  
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`Failed to fetch movies: ${response.statusText}`);
      }
  
      const data = await response.json();
      if (data.Response === 'True') {
        if (query) {
          allMovies.push(data.Search); // single movie result
          console.log(data)
          break; // no need to loop more
          
        } else if (data.Search) {
          allMovies.push(...data.Search);
        }
      } else {
        console.log(`Stopped at page ${page}:`, data.Error);
        break;
      }
    }
  
    return allMovies;
  };
  