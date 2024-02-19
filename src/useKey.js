import { useEffect } from "react";

export function useKey(key, action) {
  //closes the movie details screen when pressing ESC
  useEffect(
    function () {
      function callback(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
        }
      }
      //triggers call back function
      document.addEventListener("keydown", callback);

      //cleanup function to remove event listener from all movie detail components to prevent excessive calls
      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [action, key]
  );
}
