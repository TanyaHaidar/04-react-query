import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import { fetchMovies } from "../../services/movieService";
import { Movie } from "../../types/movie";
import styles from "./App.module.css";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Movie | null>(null);

  async function handleSearch(query: string) {
    setMovies([]);
    setError(null);
    setLoading(true);
    try {
      const results = await fetchMovies(query);
      if (!results || results.length === 0) {
        toast("No movies found for your request.");
      }
      setMovies(results);
    } catch (err) {
      setError("Failed to fetch movies");
      toast.error("There was an error fetching movies.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {movies.length > 0 && !loading && !error && (
        <MovieGrid movies={movies} onSelect={setSelected} />
      )}
      {selected && (
        <MovieModal movie={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
