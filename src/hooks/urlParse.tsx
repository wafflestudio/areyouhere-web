import { useLocation } from "react-router-dom";

function useClassId() {
  const location = useLocation();
  const data = location.pathname.split("/");
  return parseInt(data[2], 10);
}

function useSessionId() {
  const location = useLocation();
  const data = location.pathname.split("/");
  return parseInt(data[4], 10);
}

function useAttendeeId() {
  const location = useLocation();
  const data = location.pathname.split("/");
  return parseInt(data[4], 10);
}

export { useClassId, useSessionId, useAttendeeId };
