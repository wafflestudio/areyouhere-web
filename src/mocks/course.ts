import { HttpStatusCode } from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

import {
  Course,
  CourseCreationRequest,
  CourseUpdateRequest,
} from "../api/course";

const courses: Course[] = [
  {
    id: 1,
    name: "Course 1",
    description: "Description for Course 1",
    allowOnlyRegistered: true,
    attendees: ["User 1", "User 2"],
  },
  {
    id: 2,
    name: "Course 2",
    description: "Description for Course 2",
    allowOnlyRegistered: false,
    attendees: ["User 3", "User 4"],
  },
  {
    id: 3,
    name: "Course 3",
    description: "Description for Course 3",
    allowOnlyRegistered: true,
    attendees: ["User 5", "User 6", "User 7"],
  },
];

function addCourseMock(mock: AxiosMockAdapter) {
  mock.onGet("/api/courses").reply(() => {
    return [HttpStatusCode.Ok, courses];
  });

  mock.onPost("/api/courses").reply((config) => {
    const data = JSON.parse(config.data) as CourseCreationRequest;
    courses.push({
      id: courses.length + 1,
      name: data.name,
      description: data.description,
      allowOnlyRegistered: data.onlyListNameAllowed,
      attendees: data.attendees,
    });
    return [HttpStatusCode.Ok];
  });

  mock.onPut(/\/api\/courses\/\d+/).reply((config) => {
    const id = Number(config.url?.split("/").pop());
    const data = JSON.parse(config.data) as CourseUpdateRequest;
    const course = courses.find((c) => c.id === id);
    if (course) {
      course.name = data.name;
      course.description = data.description;
      course.allowOnlyRegistered = data.onlyListNameAllowed;
      return [HttpStatusCode.Ok];
    } else {
      return [HttpStatusCode.NotFound];
    }
  });

  mock.onDelete(/\/api\/courses\/\d+/).reply((config) => {
    const id = Number(config.url?.split("/").pop());
    const index = courses.findIndex((c) => c.id === id);
    if (index !== -1) {
      courses.splice(index, 1);
      return [HttpStatusCode.Ok];
    } else {
      return [HttpStatusCode.NotFound];
    }
  });
}

export default addCourseMock;
