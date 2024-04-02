import { useQuery } from "@tanstack/react-query";
import axios, { HttpStatusCode } from "axios";

import { AttendeeInfo, PickPartial } from "../type.ts";

export type GetAttendeesResponse = {
  classAttendees: {
    attendee: AttendeeInfo;
    attendance: number;
    absence: number;
  }[];
};

export type GetAttendeesResult = {
  attendee: AttendeeInfo;
  attendance: number;
  absence: number;
}[];

export type AttendanceInfo = {
  attendanceId: number;
  sessionName: string;
  attendanceStatus: boolean;
  attendanceTime: Date;
};

export type GetAttendeeResult = {
  attendee: AttendeeInfo;
  attendance: number;
  absence: number;
  attendanceInfo: AttendanceInfo[];
};

export type CreateAttendeeRequest = {
  courseId: number;
  newAttendees: Omit<AttendeeInfo, "id">[];
};

export type GetAttendeeDuplicateRequest = {
  courseId: number;
  newAttendees: string[];
};

export type GetAttendeeDuplicateResponse = {
  // if the attendee is new attendee, id will be null
  duplicatedAttendees: PickPartial<AttendeeInfo, "id">[];
};

export type DeleteAttendeeRequest = {
  attendeeIds: number[];
};

export type UpdateAttendeeRequest = {
  courseId: number;
  updatedAttendees: AttendeeInfo[];
};

export const getAttendees = async (
  courseId: number
): Promise<GetAttendeesResult> => {
  const res = await axios.get<GetAttendeesResponse>(`/api/attendee`, {
    params: { courseId },
    validateStatus: () => true,
  });

  if (res.status === HttpStatusCode.NoContent) {
    return [];
  } else if (res.status === HttpStatusCode.Ok) {
    return res.data.classAttendees;
  } else {
    throw new Error("Failed to get attendees");
  }
};

export const getAttendee = async (
  attendeeId: number
): Promise<GetAttendeeResult> => {
  const res = await axios.get<GetAttendeeResult>(`/api/attendee/detail`, {
    params: { attendeeId },
    validateStatus: () => true,
  });

  if (res.status === HttpStatusCode.Ok) {
    return {
      ...res.data,
      attendanceInfo: res.data.attendanceInfo?.map((info) => ({
        attendanceId: info.attendanceId,
        sessionName: info.sessionName,
        attendanceStatus: info.attendanceStatus,
        attendanceTime: new Date(info.attendanceTime),
      })),
    };
  } else {
    throw new Error("Failed to get attendee");
  }
};

export const createAttendee = async (
  request: CreateAttendeeRequest
): Promise<void> => {
  return axios.post("/api/attendee", request);
};

export const getDuplicatedAttendee = async (
  request: GetAttendeeDuplicateRequest
): Promise<GetAttendeeDuplicateResponse> => {
  return (await axios.post("/api/attendee/duplicate", request)).data;
};

export const deleteAttendee = async (
  request: DeleteAttendeeRequest
): Promise<void> => {
  return axios.post("/api/attendee/delete", request);
};

export const updateAttendee = async (
  request: UpdateAttendeeRequest
): Promise<void> => {
  return axios.put("/api/attendee", request);
};

export const useAttendees = (courseId: number) => {
  return useQuery<GetAttendeesResult>({
    queryKey: ["attendees", courseId],
    queryFn: () => getAttendees(courseId),
  });
};

export const useAttendee = (attendeeId: number) => {
  return useQuery<GetAttendeeResult>({
    queryKey: ["attendee", attendeeId],
    queryFn: () => getAttendee(attendeeId),
  });
};
