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
export const NICKNAME_REGEX = "^(?=.*[a-zA-Z0-9가-힣])[a-zA-Z0-9가-힣]{2,16}$";

export const getUser = async (): Promise<User | null> => {
  const res = await axios.get<User>("/api/manager", {
    validateStatus: () => true,
  });
  if (res.status === HttpStatusCode.Ok) {
    return res.data;
  } else {
    return null;
  }
};

export const signUp = async (request: SignUpRequest): Promise<void> => {
  return await axios.post("/api/manager", request, {
    withCredentials: true,
  });
};

export const signIn = async (request: SignInRequest): Promise<void> => {
  const res = await axios.post("/api/manager/login", request, {
    validateStatus: () => true,
    withCredentials: true,
  });

  if (res.status == HttpStatusCode.Ok) {
    return;
  } else {
    throw new Error("Failed to sign in");
  }
};

export const logout = async (): Promise<void> => {
  return axios.get("/api/manager/logout", {
    withCredentials: true,
  });
};

let isEmailConflictRequestId = 0;

export const isEmailConflict = async (
  email: string,
  enabled: boolean
): Promise<boolean> => {
  if (!enabled) {
    return false;
  }

  // 10000000개 이상의 요청이 100ms 안에 들어오지는 않을 것이라 가정
  const requestId =
    isEmailConflictRequestId > 10000000 ? 0 : isEmailConflictRequestId + 1;
  isEmailConflictRequestId = requestId;

  await new Promise((resolve) => setTimeout(resolve, 100));

  if (requestId !== isEmailConflictRequestId) {
    return false;
  }

  console.log("isEmailConflict", email);

  const res = await axios.get(`/api/manager/${email}`, {
    validateStatus: () => true,
  });

  return res.status == HttpStatusCode.Conflict;
};

export const useUser = () => {
  return useQuery<User | null>({
    queryKey: ["user"],
    queryFn: getUser,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

export const useEmailConflict = (email: string, enabled: boolean) => {
  return useQuery<boolean>({
    queryKey: ["user", email],
    queryFn: () => isEmailConflict(email, enabled),
  });
};
