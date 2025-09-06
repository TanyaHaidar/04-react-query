import axios from "axios";
import { Movie } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3/search/movie";
const token = import.meta.env.VITE_TMDB_TOKEN;

interface TMDBResponse {
  results: Movie[];
}

export async function fetchMovies(query: string): Promise<Movie[]> {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      query,
      language: "en-US",
    },
  };

  const response = await axios.get<TMDBResponse>(BASE_URL, config);
  return response.data.results;
}

export function getImageUrl(path: string, size: string = "w500"): string {
  return `https://image.tmdb.org/t/p/${size}${path}`;
}
