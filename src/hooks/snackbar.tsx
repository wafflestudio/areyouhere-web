import { useState, useRef } from "react";

function useSnackbar() {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const snackbarTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const show = () => {
    setShowSnackbar(true);
    if (snackbarTimeoutRef.current) {
      clearTimeout(snackbarTimeoutRef.current);
    }
    snackbarTimeoutRef.current = setTimeout(() => {
      setShowSnackbar(false);
    }, 2200);
  };

  const hide = () => {
    setShowSnackbar(false);
    if (snackbarTimeoutRef.current) {
      clearTimeout(snackbarTimeoutRef.current);
    }
  };

  return { showSnackbar, show, hide };
}

export default useSnackbar;
