import { useState } from "react";

interface MovieCardProps {
  id: number;
  title: string;
  year: number;
  genre: string[];
  watched: boolean;
  rating: number;
  onWatchedChange: (id: number) => void;
  onRatingChange: (id: number, rating: number) => void;
}

function MovieCard({
  id,
  title,
  year,
  genre,
  watched,
  rating,
  onWatchedChange,
  onRatingChange,
}: MovieCardProps) {
  const [localWatched, setLocalWatched] = useState(watched);

  const handleWatchedClick = () => {
    setLocalWatched(!localWatched);
    onWatchedChange(id);
  };

  return (
    <div className={`movie-card ${localWatched ? "watched" : ""}`}>
      <h2>{title}</h2>

      <p>Rok: {year}</p>

      <p>Gatunek: {genre.join(", ")}</p>

      <button onClick={handleWatchedClick}>
        {localWatched ? "✓ Obejrzany" : "Oznacz jako obejrzany"}
      </button>

      <div className="rating">
        <p>Ocena:</p>

        {Array.from({ length: 5 }, (_, index) => {
          const star = index + 1;

          return (
            <button
              key={star}
              className="star-button"
              onClick={() => onRatingChange(id, star)}
            >
              {star <= rating ? "★" : "☆"}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default MovieCard;