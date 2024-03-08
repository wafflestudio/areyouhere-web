import { useQuery } from "@tanstack/react-query";
import axios, { HttpStatusCode } from "axios";

export type AttendanceRequest = {
  attendeeName: string;
  authCode: string;
};

export type AttendanceResponse = {
  attendanceName: string;
  sessionName: string;
  courseName: string;
  attendanceTime: Date;
};

export enum AttendanceErrorCode {
  InvalidAuthCode = "InvalidAuthCode",
  InvalidName = "InvalidName",
  FailedToAttend = "FailedToAttend",
}

export type AttendanceStatus = {
  attendances: number;
  total: number;
};

export type UpdateAttendee = {
  attendanceId: number;
  attendanceStatus: boolean;
};

export type UpdateAttendeeRequest = {
  updateAttendances: UpdateAttendee[];
};

export const attend = async (
  request: AttendanceRequest
): Promise<AttendanceResponse> => {
  const res = await axios.post("/api/attendance", request);
  if (res.status === HttpStatusCode.Ok) {
    const data = res.data as AttendanceResponse;
    data.attendanceTime = new Date(data.attendanceTime);

    return data;
  } else if (res.status === HttpStatusCode.NotFound) {
    throw new Error(AttendanceErrorCode.InvalidAuthCode);
  } else if (res.status === HttpStatusCode.NoContent) {
    throw new Error(AttendanceErrorCode.InvalidName);
  } else {
    throw new Error(AttendanceErrorCode.FailedToAttend);
  }
};

export const getAttendanceStatus = async (
  courseId: number,
  sessionId?: number
): Promise<AttendanceStatus> => {
  if (sessionId == null) {
    return { attendances: 0, total: 0 };
  }
  const res = await axios.get(`/api/attendance`, {
    params: {
      courseId,
      sessionId,
    },
  });
  return res.data;
};

// /api/attendance/update
// {updateAttendances: [{attendanceId : "Long", attendanceStatus : "boolean"}, ... {...}, ..., {...}]}
export const updateAttendances = async (
  request: UpdateAttendeeRequest
): Promise<void> => {
  await axios.put("/api/attendance", request);
};

export const useAttendanceStatus = (courseId: number, sessionId?: number) => {
  return useQuery({
    queryKey: ["attendance", courseId, sessionId],
    queryFn: () => getAttendanceStatus(courseId, sessionId),
    refetchInterval: 1000,
  });
};
