import { useQuery } from "@tanstack/react-query";
import axios, { HttpStatusCode } from "axios";

export type SignUpRequest = {
  nickname: string;
  email: string;
  password: string;
};

export type SignInRequest = {
  email: string;
  password: string;
};

export type User = {
  email: string;
  name: string;
};

export const EMAIL_REGEX =
  "^[\\w!#$%&'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$";
export const PASSWORD_REGEX = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*\\W).{8,20}$";
export const NICKNAME_REGEX = "^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$";

export const getUser = async (): Promise<User> => {
  return (await axios.get<User>("/api/manager")).data;
};

export const postSignUp = async (request: SignUpRequest): Promise<void> => {
  return axios.post("/api/manager", request);
};

export const postSignIn = async (request: SignInRequest): Promise<void> => {
  const res = await axios.post("/api/manager/login", request, {
    validateStatus: () => true,
  });

  if (res.status == HttpStatusCode.Ok) {
    return;
  } else {
    throw new Error("Failed to sign in");
  }
};

export const getLogout = async (): Promise<void> => {
  return axios.get("/api/manager/logout");
};

const getEmailConflictRequestId = 0;

export const getEmailConflict = async (
  email: string,
  enabled: boolean
): Promise<boolean> => {
  console.log("getEmailConflict", email, enabled);
  if (!enabled) {
    return false;
  }

  // 1000개 이상의 요청이 100ms 안에 들어오지는 않을 것이라 가정
  const requestId =
    getEmailConflictRequestId > 1000 ? 0 : getEmailConflictRequestId + 1;

  await new Promise((resolve) => setTimeout(resolve, 100));

  if (requestId !== getEmailConflictRequestId) {
    return false;
  }

  const res = await axios.get(`/api/manager/${email}`, {
    validateStatus: () => true,
  });

  if (res.status == HttpStatusCode.Conflict) {
    return true;
  } else {
    return false;
  }
};

export const useUser = () => {
  return useQuery<User>({
    queryKey: ["user"],
    queryFn: getUser,
  });
};

export const useEmailConflict = (email: string, enabled: boolean) => {
  return useQuery<boolean>({
    queryKey: ["user", email],
    queryFn: () => getEmailConflict(email, enabled),
  });
};
