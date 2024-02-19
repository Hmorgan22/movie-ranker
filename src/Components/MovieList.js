import { Movie } from "./Movie";

export function MovieList({ movies, handleSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          handleSelectMovie={handleSelectMovie}
        ></Movie>
      ))}
    </ul>
  );
}
