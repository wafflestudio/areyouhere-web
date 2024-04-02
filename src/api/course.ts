import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { AttendeeInfo } from "../type.ts";

export type CourseCreationRequest = {
  name: string;
  description: string;
  attendees: Omit<AttendeeInfo, "id">[];
  onlyListNameAllowed: boolean;
};

export type CourseUpdateRequest = {
  id: number;
  name: string;
  description: string;
  onlyListNameAllowed: boolean;
};

export type Course = {
  id: number;
  name: string;
  description: string;
  allowOnlyRegistered: boolean;
};

export type CoursePreview = {
  id: number;
  name: string;
  description: string;
  attendees: number;
  allowOnlyRegistered: boolean;
};

export type CourseListResponse = {
  courses: CoursePreview[];
};

export const getCourses = async (): Promise<CoursePreview[]> => {
  return (await axios.get<CourseListResponse>("/api/course")).data.courses;
};

export const getCourse = async (id: number): Promise<Course> => {
  return (await axios.get<Course>(`/api/course/${id}`)).data;
};

export const createCourse = async (
  request: CourseCreationRequest
): Promise<void> => {
  return axios.post("/api/course", request);
};

export const updateCourse = async (
  request: CourseUpdateRequest
): Promise<void> => {
  const { id, ...rest } = request;
  return axios.put(`/api/course/${id}`, rest);
};

export const deleteCourse = async (id: number): Promise<void> => {
  return axios.delete(`/api/course/${id}`);
};

export const useCourses = () => {
  return useQuery<CoursePreview[]>({
    queryKey: ["courses"],
    queryFn: getCourses,
  });
};

export const useCourse = (id: number) => {
  return useQuery<Course>({
    queryKey: ["course", id],
    queryFn: () => getCourse(id),
  });
};
