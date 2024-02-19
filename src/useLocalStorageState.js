import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  //stores watched movie list in local storage to persist refreshes
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value]
  );

  return [value, setValue];
}
