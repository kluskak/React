import { useState } from "react";
import MovieCard from "./components/MovieCard";
import moviesData from "./data/movies.json";
import "./App.css";

interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string[];
}

type Filter = "all" | "watched" | "unwatched";

function App() {
  const [movies, setMovies] = useState<Movie[]>(moviesData);

  const [watchedMovies, setWatchedMovies] = useState<number[]>([]);

  const [ratings, setRatings] = useState<Record<number, number>>({});

  const [filter, setFilter] = useState<Filter>("all");

  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [genres, setGenres] = useState<string[]>([""]);

  const handleWatchedChange = (id: number) => {
    setWatchedMovies((previous) => {
      if (previous.includes(id)) {
        return previous.filter((movieId) => movieId !== id);
      }

      return [...previous, id];
    });
  };

  const handleRatingChange = (id: number, rating: number) => {
    setRatings((previous) => ({
      ...previous,
      [id]: rating,
    }));
  };

  const addGenreField = () => {
    setGenres((previous) => [...previous, ""]);
  };

  const handleGenreChange = (index: number, value: string) => {
    setGenres((previous) => {
      const newGenres = [...previous];
      newGenres[index] = value;

      return newGenres;
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title || !year) {
      return;
    }

    const newMovie: Movie = {
      id: Date.now(),
      title: title,
      year: Number(year),
      genre: genres.filter((genre) => genre.trim() !== ""),
    };

    setMovies((previous) => [...previous, newMovie]);

    setTitle("");
    setYear("");
    setGenres([""]);
  };

  const clearAll = () => {
    setMovies([]);
    setWatchedMovies([]);
    setRatings({});
  };

  const filteredMovies = movies.filter((movie) => {
    if (filter === "watched") {
      return watchedMovies.includes(movie.id);
    }

    if (filter === "unwatched") {
      return !watchedMovies.includes(movie.id);
    }

    return true;
  });

  return (
    <div className="app">
      <header>
        <h1>Moja lista filmów</h1>

        <p className="counter">
          Obejrzane: {watchedMovies.length} / {movies.length}
        </p>
      </header>

      <section className="add-movie">
        <h2>Dodaj film</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Tytuł filmu"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />

          <input
            type="number"
            placeholder="Rok"
            value={year}
            onChange={(event) => setYear(event.target.value)}
          />

          <div className="genres">
            <p>Gatunki:</p>

            {genres.map((genre, index) => (
              <div className="genre-input" key={index}>
                <input
                  type="text"
                  placeholder="Gatunek"
                  value={genre}
                  onChange={(event) =>
                    handleGenreChange(index, event.target.value)
                  }
                />

                {index === genres.length - 1 && (
                  <button type="button" onClick={addGenreField}>
                    +
                  </button>
                )}
              </div>
            ))}
          </div>

          <button type="submit">Dodaj</button>
        </form>
      </section>

      <section className="filters">
        <button onClick={() => setFilter("all")}>Wszystkie</button>

        <button onClick={() => setFilter("watched")}>Obejrzane</button>

        <button onClick={() => setFilter("unwatched")}>Nieobejrzane</button>
      </section>

      <section className="movies">
        {filteredMovies.length === 0 ? (
          <p className="empty">Lista filmów jest pusta</p>
        ) : (
          filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              year={movie.year}
              genre={movie.genre}
              watched={watchedMovies.includes(movie.id)}
              rating={ratings[movie.id] || 0}
              onWatchedChange={handleWatchedChange}
              onRatingChange={handleRatingChange}
            />
          ))
        )}
      </section>

      <button className="clear-button" onClick={clearAll}>
        Wyczyść wszystkie
      </button>
    </div>
  );
}

export default App;