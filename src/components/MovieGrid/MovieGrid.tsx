import { Movie } from "../../types/movie";
import { getImageUrl } from "../../services/movieService";
import styles from "./MovieGrid.module.css";

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  return (
    <ul className={styles.grid}>
      {movies.map((movie) => (
        <li
          key={movie.id}
          className={styles.card}
          onClick={() => onSelect(movie)}
        >
          <img
            src={getImageUrl(movie.poster_path, "w500")}
            alt={movie.title}
            loading="lazy"
            className={styles.image}
          />
          <p className={styles.title}>{movie.title}</p>
        </li>
      ))}
    </ul>
  );
}
