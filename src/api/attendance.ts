import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type AttendanceRequest = {
  attendeeName: string;
  authCode: string;
};

export type AttendanceStatus = {
  attendances: number;
  total: number;
};

export type UpdateAttendee = {
  attendeeId: number;
  attendanceStatus: boolean;
};

export const attend = async (request: AttendanceRequest): Promise<void> => {
  const res = await axios.post("/api/attendance", request);
  if (res.status !== 200) {
    throw new Error("Invalid passcode");
  }
};

export const getAttendanceStatus = async (
  courseId: number,
  sessionId?: number
): Promise<AttendanceStatus> => {
  if (sessionId == null) {
    return { attendances: 0, total: 0 };
  }
  const res = await axios.get(`/api/attendance/${courseId}/${sessionId}`);
  return res.data;
};

// /api/attendance/update
// {updateAttendances: [{attendanceId : "Long", attendanceStatus : "boolean"}, ... {...}, ..., {...}]}
export const updateAttendances = async (
  updateAttendances: UpdateAttendee[]
): Promise<void> => {
  await axios.post("/api/attendance/update", { updateAttendances });
};

export const useAttendanceStatus = (courseId: number, sessionId?: number) => {
  return useQuery({
    queryKey: ["attendance", courseId, sessionId],
    queryFn: () => getAttendanceStatus(courseId, sessionId),
    refetchInterval: 1000,
  });
};
