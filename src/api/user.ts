import { useQuery } from "@tanstack/react-query";
import axios, { HttpStatusCode } from "axios";

export type SignUpRequest = {
  name: string;
  email: string;
  password: string;
};

export type SignInRequest = {
  email: string;
  password: string;
};

export type User = {
  name: string;
};

export const postSignUp = async (request: SignUpRequest): Promise<void> => {
  return axios.post("/api/user", request);
};

export const postSignIn = async (request: SignInRequest): Promise<void> => {
  const res = await axios.post("/api/user/login", request, {
    validateStatus: () => true,
  });

  if (res.status == HttpStatusCode.Ok) {
    return;
  } else {
    throw new Error("Failed to sign in");
  }
};

export const getLogout = async (): Promise<void> => {
  return axios.get("/api/user/logout");
};

export const getEmailConflict = async (email: string): Promise<boolean> => {
  const res = await axios.get(`/api/user/${email}`, {
    validateStatus: () => true,
  });

  if (res.status == HttpStatusCode.Conflict) {
    return true;
  } else {
    return false;
  }
};

export const getUser = async (): Promise<User> => {
  return (await axios.get<User>("/api/user")).data;
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
