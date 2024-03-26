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

export type CreateAttendeeRequest = {
  courseId: number;
  newAttendees: Omit<AttendeeInfo, "id">[];
};

export type GetAttendeeDuplicateResponse = {
  // if the attendee is new attendee, id will be null
  duplicatedAttendees: PickPartial<AttendeeInfo, "id">[];
};

export type DeleteAttendeeRequest = {
  attendeeIds: number[];
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

export const createAttendee = async (
  request: CreateAttendeeRequest
): Promise<void> => {
  return axios.post("/api/attendee", request);
};

export const getDuplicatedAttendees = async (
  request: CreateAttendeeRequest
): Promise<GetAttendeeDuplicateResponse> => {
  return axios.post("/api/attendee/duplicate", request);
};

export const deleteAttendee = async (
  request: DeleteAttendeeRequest
): Promise<void> => {
  return axios.post("/api/attendee/delete", request);
};

export const useAttendees = (courseId: number) => {
  return useQuery<GetAttendeesResult>({
    queryKey: ["attendees", courseId],
    queryFn: () => getAttendees(courseId),
  });
};
