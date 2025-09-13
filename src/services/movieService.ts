import axios from "axios";
import { Movie } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3/search/movie";
const token = import.meta.env.VITE_TMDB_TOKEN;

export interface SearchMoviesResponse {
  page: number;
  results: Movie[];
  total_results: number;
  total_pages: number;
}

export async function fetchMovies(
  query: string,
  page: number
): Promise<SearchMoviesResponse> {
  const config = {
    params: { query, include_adult: false, language: "en-US", page },
    headers: { Authorization: `Bearer ${TOKEN}` },
  };

  const res: AxiosResponse<SearchMoviesResponse> = await axios.get(
    BASE_URL,
    config
  );
  return res.data;
}

export function getImageUrl(
  path: string,
  size: "w500" | "original" = "w500"
): string {
  return `https://image.tmdb.org/t/p/${size}${path}`;
}
