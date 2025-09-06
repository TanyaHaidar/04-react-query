import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Movie } from "../../types/movie";
import { getImageUrl } from "../../services/movieService";
import styles from "./MovieModal.module.css";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.code === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = original;
    };
  }, [onClose]);

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.currentTarget === e.target) onClose();
  }

  return createPortal(
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <button
          onClick={onClose}
          aria-label="Close modal"
          className={styles.close}
        >
          ✕
        </button>
        <img
          src={getImageUrl(movie.backdrop_path, "original")}
          alt={movie.title}
          className={styles.image}
        />
        <h2 className={styles.title}>{movie.title}</h2>
        <p className={styles.overview}>{movie.overview}</p>
        <p className={styles.info}>
          Release: {movie.release_date} | Rating: {movie.vote_average}
        </p>
      </div>
    </div>,
    document.body
  );
}
