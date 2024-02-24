import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type CourseCreationRequest = {
  name: string;
  description: string;
  attendees: string[];
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
  attendees: string[];
  allowOnlyRegistered: boolean;
};

export const getCourses = async (): Promise<Course[]> => {
  return (await axios.get<Course[]>("/api/course")).data;
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
  return useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: getCourses,
  });
};
