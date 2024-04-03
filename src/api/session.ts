import { useQuery } from "@tanstack/react-query";
import axios, { HttpStatusCode } from "axios";

import { AttendeeInfo } from "../type.ts";

export type Session = {
  id: number;
  name: string;
  date: Date;
  attendee: number;
  absentee: number;
};

export type GetSessionsResponse = {
  allSessionAttendanceInfo: Session[];
};

export type SessionAttendee = {
  attendanceId: number;
  attendee: Omit<AttendeeInfo, "id">;
  attendanceStatus: boolean;
  attendanceTime: Date;
};

export type GetSessionAttendeesResponse = {
  sessionAttendees: SessionAttendee[];
};

export type GetSessionAbsenteesResponse = {
  sessionAttendees: SessionAttendee[];
};

export type CreateSessionRequest = {
  courseId: number;
  sessionName: string;
};

export type UpdateSessionsRequest = {
  sessions: {
    id: number;
    name: string;
  }[];
};

export type DeleteSessionRequest = {
  sessionIds: number[];
};

export type SessionWithoutId = Omit<Session, "id">;

export const getSessions = async (courseId: number): Promise<Session[]> => {
  const res = await axios.get<GetSessionsResponse>(`/api/session`, {
    params: { courseId },
    validateStatus: () => true,
  });

  if (res.status === HttpStatusCode.NoContent) {
    return [];
  } else if (res.status === HttpStatusCode.Ok) {
    const data = res.data.allSessionAttendanceInfo;
    data.forEach((info) => {
      info.date = new Date(info.date);
    });
    return data;
  } else {
    throw new Error("Failed to get sessions");
  }
};

export const getSession = async (
  sessionId: number
): Promise<SessionWithoutId> => {
  return (await axios.get<SessionWithoutId>(`/api/session/${sessionId}`)).data;
};

export const getSessionAttendees = async (
  sessionId: number
): Promise<SessionAttendee[]> => {
  const res = await axios.get<GetSessionAttendeesResponse>(
    `/api/session/${sessionId}/attendee`,
    {
      validateStatus: () => true,
    }
  );

  if (res.status === HttpStatusCode.NoContent) {
    return [];
  } else if (res.status === HttpStatusCode.Ok) {
    const data = res.data.sessionAttendees;
    data.forEach((info) => {
      info.attendanceTime = new Date(info.attendanceTime);
    });
    return data;
  } else {
    throw new Error("Failed to get session attendees");
  }
};

export const getSessionAbsenteesOnly = async (
  sessionId: number
): Promise<SessionAttendee[]> => {
  const res = await axios.get<GetSessionAbsenteesResponse>(
    `/api/session/${sessionId}/absentee`,
    {
      validateStatus: () => true,
    }
  );

  if (res.status === HttpStatusCode.NoContent) {
    return [];
  } else if (res.status === HttpStatusCode.Ok) {
    const data = res.data.sessionAttendees;
    data.forEach((info) => {
      info.attendanceTime = new Date(info.attendanceTime);
    });
    return data;
  } else {
    throw new Error("Failed to get session absentees");
  }
};

export const createSession = async (request: CreateSessionRequest) => {
  return axios.post("/api/session", request);
};

export const deleteSession = async (request: DeleteSessionRequest) => {
  return axios.post(`/api/session/delete`, request);
};

export const updateSessions = async (request: UpdateSessionsRequest) => {
  return axios.put("/api/session", request);
};

export const useSessions = (courseId: number) => {
  return useQuery<Session[]>({
    queryKey: ["sessions", courseId],
    queryFn: () => getSessions(courseId),
  });
};

export const useSession = (id: number) => {
  return useQuery<SessionWithoutId>({
    queryKey: ["session", id],
    queryFn: () => getSession(id),
  });
};

export const useSessionAttendees = (sessionId: number) => {
  return useQuery<SessionAttendee[]>({
    queryKey: ["sessionAttendees", sessionId],
    queryFn: () => getSessionAttendees(sessionId),
  });
};

export const useSessionAbsenteesOnly = (sessionId: number) => {
  return useQuery<SessionAttendee[]>({
    queryKey: ["sessionAbsentees", sessionId],
    queryFn: () => getSessionAbsenteesOnly(sessionId),
  });
};
