import { useLocation } from "react-router-dom";

function useClassId() {
  const location = useLocation();
  const data = location.pathname.split("/");
  if (data.length < 3) return null;
  return parseInt(data[2], 10);
}

function useSessionId() {
  const location = useLocation();
  const data = location.pathname.split("/");
  if (data.length < 5) return null;
  return parseInt(data[4], 10);
}

export { useClassId, useSessionId };
