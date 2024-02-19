import { useRef } from "react";
import { useKey } from "../useKey";

export function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  //when pressing enter the program will focus back on the search bar and clear results if the search bar is not already focused
  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
