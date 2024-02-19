import { useState } from "react";
import { useMovies } from "../useMovies";
import { useLocalStorageState } from "../useLocalStorageState";
import { Loader } from "./Loader";
import { WatchedList } from "./WatchedList";
import { MovieDetails } from "./MovieDetails";
import { MovieList } from "./MovieList";
import { Box } from "./Box";
import { ErrorMessage } from "./ErrorMessage";
import { NavBar } from "./NavBar";
import { Main } from "./Main";
import { Search } from "./Search";
import { Logo } from "./Logo";
import { ResultsFound } from "./ResultsFound";
import { WatchedSummary } from "./WatchedSummary";

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export const KEY = "bdf8da2c";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  //custom hook to fetch movie data from the api
  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);

  //custom hook to load watched movies from local storage
  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleSelectMovie(id) {
    id === selectedId ? setSelectedId(null) : setSelectedId(id);
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <Logo>Movie Ranker</Logo>
        <Search setQuery={setQuery} query={query}></Search>
        <ResultsFound movies={movies}></ResultsFound>
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader></Loader>}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && (
            <MovieList
              movies={movies}
              handleSelectMovie={handleSelectMovie}
            ></MovieList>
          )}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              watched={watched}
              onCloseMovie={handleCloseMovie}
              handleAddWatched={handleAddWatched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched}></WatchedSummary>
              <WatchedList
                watched={watched}
                handleDeleteWatched={handleDeleteWatched}
              ></WatchedList>
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
