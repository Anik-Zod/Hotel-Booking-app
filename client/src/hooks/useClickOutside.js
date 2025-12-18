import { useEffect } from "react";

export function useClickOutside(ref, callback, ignoreRef) {
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && ref.current.contains(e.target)) return;
      if (
        ignoreRef &&
        ignoreRef.current &&
        ignoreRef.current.contains(e.target)
      )
        return;
      callback();
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, callback, ignoreRef]);
}
