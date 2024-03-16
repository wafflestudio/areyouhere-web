import { useQuery } from "@tanstack/react-query";
import axios, { HttpStatusCode } from "axios";

export type Attendee = {
  id: number;
  name: string;
  attendance: number;
  absence: number;
};

export type CreateAttendeeRequest = {
  courseId: number;
  newAttendees: string[];
};

export type DeleteAttendeeRequest = {
  attendeeIds: number[];
};

export const getAttendees = async (courseId: number): Promise<Attendee[]> => {
  const res = await axios.get<{
    classAttendees: Attendee[];
  }>(`/api/attendee`, {
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

export const deleteAttendee = async (
  request: DeleteAttendeeRequest
): Promise<void> => {
  return axios.post("/api/attendee/delete", request);
};

export const useAttendees = (courseId: number) => {
  return useQuery<Attendee[]>({
    queryKey: ["attendees", courseId],
    queryFn: () => getAttendees(courseId),
  });
};
