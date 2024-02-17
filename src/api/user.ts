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

export const getEmailConflict = async (email: string): Promise<boolean> => {
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

export const useEmailConflict = (email: string) => {
  return useQuery<boolean>({
    queryKey: ["user", email],
    queryFn: () => getEmailConflict(email),
  });
};
