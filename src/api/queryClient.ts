import { QueryClient } from "@tanstack/react-query";
import axios, { HttpStatusCode, isAxiosError } from "axios";

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;

// 일부 에러 코드의 경우 서버에서 의도적으로 내려주는 코드이므로,
// 재시도를 하지 않도록 설정합니다.
const HTTP_STATUS_TO_NOT_RETRY = [
  HttpStatusCode.Forbidden,
  HttpStatusCode.BadRequest,
  HttpStatusCode.Unauthorized,
  HttpStatusCode.Conflict,
];

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry(failureCount, error) {
        if (
          isAxiosError(error) &&
          error.response != null &&
          HTTP_STATUS_TO_NOT_RETRY.includes(error.response?.status)
        ) {
          return false;
        } else {
          return failureCount < 3;
        }
      },
    },
  },
});

export default queryClient;
