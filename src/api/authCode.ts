import axios, { HttpStatusCode } from "axios";

export type CreateAuthCodeRequest = {
  courseId: number;
  sessionId: number;
};

export type DeactivateAuthCodeRequest = {
  authCode: string;
  sessionId: number;
  courseId: number;
};

export const createAuthCode = async (
  request: CreateAuthCodeRequest
): Promise<string | null> => {
  const res = await axios.post<string>(`/api/auth-code`, request, {
    validateStatus: () => true,
  });

  if (res.status === HttpStatusCode.NoContent) {
    return null;
  } else if (res.status === HttpStatusCode.Ok) {
    return res.data;
  } else {
    throw new Error("Failed to get auth code");
  }
};

export const deactivateAuthCode = async (
  request: DeactivateAuthCodeRequest
): Promise<void> => {
  const res = await axios.post(`/api/auth-code/deactivate`, request, {
    validateStatus: () => true,
  });

  if (res.status === HttpStatusCode.Ok) {
    return;
  } else {
    throw new Error("Failed to deactivate auth code");
  }
};
