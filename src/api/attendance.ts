import { useQuery } from "@tanstack/react-query";
import axios, { HttpStatusCode } from "axios";

import { AttendeeInfo } from "../type.ts";

export type AttendanceRequest = {
  attendeeName: string;
  authCode: string;
  attendeeId?: number;
};

export type AttendanceOneChoiceResponse = {
  attendanceName: string;
  sessionName: string;
  courseName: string;
  attendanceTime: Date;
};

export type AttendanceMultipleChoicesResponse = {
  attendeeNotes: Omit<AttendeeInfo, "name">[];
};

export type AttendanceResult =
  | {
      type: "oneChoice";
      response: AttendanceOneChoiceResponse;
    }
  | {
      type: "multipleChoices";
      response: AttendanceMultipleChoicesResponse;
    };

export enum AttendanceErrorCode {
  InvalidAuthCode = "InvalidAuthCode",
  InvalidName = "InvalidName",
  FailedToAttend = "FailedToAttend",
  AlreadyAttended = "AlreadyAttended",
  DifferentName = "DifferentName",
}

export type AttendanceStatus = {
  attendances: number;
  total: number;
};

export type UpdateAttendee = {
  attendanceId: number;
  attendanceStatus: boolean;
};

export type UpdateAttendanceStatusRequest = {
  updateAttendances: UpdateAttendee[];
};

export type DetailedAttendanceStatus = {
  attendees: AttendeeInfo[];
  absentees: AttendeeInfo[];
};

export const postAttend = async (
  request: AttendanceRequest
): Promise<AttendanceResult> => {
  const res = await axios.post("/api/attendance", request, {
    validateStatus: () => true,
  });
  if (res.status === HttpStatusCode.Ok) {
    const data = res.data as AttendanceOneChoiceResponse;
    data.attendanceTime = new Date(data.attendanceTime);
    return {
      type: "oneChoice",
      response: data,
    };
  } else if (res.status === HttpStatusCode.MultipleChoices) {
    return {
      type: "multipleChoices",
      response: res.data as AttendanceMultipleChoicesResponse,
    };
  } else if (res.status === HttpStatusCode.NotFound) {
    throw new Error(AttendanceErrorCode.InvalidAuthCode);
  } else if (res.status === HttpStatusCode.BadRequest) {
    throw new Error(AttendanceErrorCode.AlreadyAttended);
  } else if (res.status === HttpStatusCode.Forbidden) {
    throw new Error(AttendanceErrorCode.DifferentName);
  } else if (res.status === HttpStatusCode.NoContent) {
    throw new Error(AttendanceErrorCode.InvalidName);
  } else {
    throw new Error(AttendanceErrorCode.FailedToAttend);
  }
};

export const getAttendanceStatus = async (
  courseId: number,
  sessionId: number
): Promise<AttendanceStatus> => {
  const res = await axios.get(`/api/attendance`, {
    params: {
      courseId,
      sessionId,
    },
  });
  return res.data;
};

export const getDetailedAttendanceStatus = async (
  authCode?: string
): Promise<DetailedAttendanceStatus> => {
  if (authCode == null) {
    return { attendees: [], absentees: [] };
  }
  const res = await axios.get(`/api/attendance/detail`, {
    params: { authCode },
  });
  return res.data;
};

export const updateAttendanceStatus = async (
  request: UpdateAttendanceStatusRequest
): Promise<void> => {
  await axios.put("/api/attendance", request);
};

export const useAttendanceStatus = (
  courseId: number,
  sessionId?: number,
  activated: boolean = true
) => {
  return useQuery({
    queryKey: ["attendance", courseId, sessionId],
    queryFn: () => {
      if (sessionId == null || !activated) {
        return { attendances: 0, total: 0 };
      }
      return getAttendanceStatus(courseId, sessionId);
    },
    refetchInterval: 1000,
  });
};

export const useDetailedAttendanceStatus = (authCode?: string) => {
  return useQuery({
    queryKey: ["attendanceDetail", authCode],
    queryFn: () => getDetailedAttendanceStatus(authCode),
  });
};
