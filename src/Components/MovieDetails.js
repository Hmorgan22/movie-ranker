import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import { useKey } from "../useKey";
import { Loader } from "./Loader";
import { KEY } from "./App";

export function MovieDetails({
  selectedId,
  onCloseMovie,
  handleAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const countRef = useRef(0);

  useEffect(
    function () {
      if (userRating) {
        countRef.current = countRef.current + 1;
      }
    },
    [userRating]
  );

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const wathcedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
      imdbRating: Number(movie.imdbRating),
      runtime: Number(movie.Runtime.split(" ").at(0)),
      userRating,
      countRatingDecisions: countRef.current,
    };
    handleAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  //custom hook to close movie summary when pressing escape
  useKey("Escape", onCloseMovie);

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res =
          await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}
        `);
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!movie.Title) return;
      document.title = `Movie | ${movie.Title}`;

      return function () {
        document.title = "Movie Ranker";
      };
    },
    [movie.Title]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={movie.Poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} &bull; {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>
                <span>⭐</span>
                {movie.imdbRating} IMDB rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    size={24}
                    maxRating={10}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated this movie {wathcedUserRating} <span>⭐</span>
                </p>
              )}
            </div>
            <p>{movie.Plot}</p>
            <p>Starring {movie.Actors}</p>
            <p>Directed by {movie.Director}</p>
          </section>
        </>
      )}
    </div>
  );
}
