import { useQuery } from "@tanstack/react-query";
import axios, { HttpStatusCode } from "axios";

import { Session } from "./session";

export type CurrentSessionInfo = {
  id: number;
  authCode?: string;
  name: string;
  startTime?: Date;
};

export const getCurrentSessionInfo = async (
  courseId: number
): Promise<CurrentSessionInfo | null> => {
  const res = await axios.get<CurrentSessionInfo>(
    `/api/course/dashboard/${courseId}`,
    {
      validateStatus: () => true,
    }
  );

  if (res.status === HttpStatusCode.NoContent) {
    return null;
  } else if (res.status === HttpStatusCode.Ok) {
    if (res.data.startTime) {
      res.data.startTime = new Date(res.data.startTime);
    }
    return res.data;
  } else {
    throw new Error("Failed to get current session info");
  }
};

export const getPreviousSessions = async (
  courseId: number
): Promise<Session[]> => {
  const res = await axios.get<{
    sessionAttendanceInfos: Session[];
  }>(`/api/course/dashboard/${courseId}/previous`, {
    validateStatus: () => true,
  });

  if (res.status === HttpStatusCode.NoContent) {
    return [];
  } else if (res.status === HttpStatusCode.Ok) {
    const data = res.data.sessionAttendanceInfos;
    data.forEach((info) => {
      info.date = new Date(info.date);
    });
    return data;
  } else {
    throw new Error("Failed to get previous sessions");
  }
};

export const useCurrentSessionInfo = (courseId: number) => {
  return useQuery<CurrentSessionInfo | null>({
    queryKey: ["currentSessionInfo", courseId],
    queryFn: () => getCurrentSessionInfo(courseId),
  });
};

export const usePreviousSessions = (courseId: number) => {
  return useQuery<Session[]>({
    queryKey: ["previousSessions", courseId],
    queryFn: () => getPreviousSessions(courseId),
  });
};
