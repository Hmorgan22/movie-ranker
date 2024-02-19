import { WatchedMovie } from "./WatchedMovie";

export function WatchedList({ watched, handleDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          handleDeleteWatched={handleDeleteWatched}
        ></WatchedMovie>
      ))}
    </ul>
  );
}
