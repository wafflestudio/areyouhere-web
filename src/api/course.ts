import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type CourseCreationRequest = {
  name: string;
  description: string;
  attendees: string[];
  onlyListNameAllowed: boolean;
};

export type CourseUpdateRequest = {
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
  return (await axios.get<Course[]>("/api/courses")).data;
};

export const createCourse = async (
  request: CourseCreationRequest
): Promise<void> => {
  return axios.post("/api/courses", request);
};

export const updateCourse = async (
  id: number,
  request: CourseUpdateRequest
): Promise<void> => {
  return axios.put(`/api/courses/${id}`, request);
};

export const deleteCourse = async (id: number): Promise<void> => {
  return axios.delete(`/api/courses/${id}`);
};

export const useCourses = () => {
  return useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: getCourses,
  });
};
