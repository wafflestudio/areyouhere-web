import { useState, useRef } from "react";

function useSnackbar() {
  const [isSnackBarShown, setIsSnackBarShown] = useState(false);
  const snackbarTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const show = () => {
    setIsSnackBarShown(true);
    if (snackbarTimeoutRef.current) {
      clearTimeout(snackbarTimeoutRef.current);
    }
    snackbarTimeoutRef.current = setTimeout(() => {
      setIsSnackBarShown(false);
    }, 2200);
  };

  const hide = () => {
    setIsSnackBarShown(false);
    if (snackbarTimeoutRef.current) {
      clearTimeout(snackbarTimeoutRef.current);
    }
  };

  return { showSnackbar: isSnackBarShown, show, hide };
}

export default useSnackbar;
