import axios, { AxiosResponse } from "axios";
import { Movie } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

interface SearchMoviesResponse {
  page: number;
  results: Movie[];
  total_results: number;
  total_pages: number;
}

export async function fetchMovies(query: string): Promise<Movie[]> {
  const url = `${BASE_URL}/search/movie`;
  const config = {
    params: { query, include_adult: false, language: "en-US", page: 1 },
    headers: { Authorization: `Bearer ${TOKEN}` },
  };
  const res: AxiosResponse<SearchMoviesResponse> = await axios.get(url, config);
  return res.data.results;
}

export function getImageUrl(path: string, size: "w500" | "original" = "w500") {
  return `https://image.tmdb.org/t/p/${size}${path}`;
}
