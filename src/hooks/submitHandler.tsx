import { useState, useRef, useCallback } from "react";

// Utility function to wrap synchronous functions in a Promise
function toAsync(fn: () => void | Promise<void>): () => Promise<void> {
  return async () => {
    if (fn.length === 0) {
      return Promise.resolve(fn());
    } else {
      return fn();
    }
  };
}

function useSubmitHandler() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef(isSubmitting);

  const handleSubmit = useCallback(
    async (submitFunction: () => void | Promise<void>) => {
      if (isSubmittingRef.current) return;

      setIsSubmitting(true);
      isSubmittingRef.current = true;

      try {
        const asyncSubmitFunction = toAsync(submitFunction);
        await asyncSubmitFunction();
      } finally {
        setIsSubmitting(false);
        isSubmittingRef.current = false;
      }
    },
    []
  );

  return { isSubmitting, handleSubmit };
}

export default useSubmitHandler;
