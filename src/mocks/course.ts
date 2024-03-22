import { HttpStatusCode } from "axios";

import {
  Course,
  CourseCreationRequest,
  CourseUpdateRequest,
} from "../api/course";

import {
  DeleteMapping,
  GetMapping,
  PostMapping,
  PutMapping,
  RequestConfig,
  RequestMapping,
} from "./base.ts";

@RequestMapping("/api/course")
export class CourseMock {
  static courses: Course[] = [
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

  @GetMapping()
  static getCourses() {
    return [
      HttpStatusCode.Ok,
      {
        courses: CourseMock.courses.map((c) => ({
          id: c.id,
          name: c.name,
          description: c.description,
          attendees: c.attendees.length,
          allowOnlyRegistered: c.allowOnlyRegistered,
        })),
      },
    ];
  }

  @GetMapping("/:id")
  static getCourse(config: RequestConfig) {
    const id = parseInt(config.pathParams.id, 10);
    const course = CourseMock.courses.find((c) => c.id === id);
    if (course) {
      return [HttpStatusCode.Ok, course];
    } else {
      return [HttpStatusCode.NotFound];
    }
  }

  @PostMapping()
  static createCourse(config: RequestConfig) {
    const data = JSON.parse(config.data) as CourseCreationRequest;
    const newId = Math.max(...CourseMock.courses.map((c) => c.id)) + 1;
    CourseMock.courses.push({
      id: newId,
      name: data.name,
      description: data.description,
      allowOnlyRegistered: data.onlyListNameAllowed,
      attendees: data.attendees,
    });
    return [HttpStatusCode.Ok];
  }

  @PutMapping("/:id")
  static updateCourse(config: RequestConfig) {
    const id = parseInt(config.pathParams.id, 10);
    const data = JSON.parse(config.data) as CourseUpdateRequest;
    const course = CourseMock.courses.find((c) => c.id === id);
    if (course) {
      course.name = data.name;
      course.description = data.description;
      course.allowOnlyRegistered = data.onlyListNameAllowed;
      return [HttpStatusCode.Ok];
    } else {
      return [HttpStatusCode.NotFound];
    }
  }

  @DeleteMapping("/:id")
  static deleteCourse(config: RequestConfig) {
    const id = parseInt(config.pathParams.id, 10);
    const index = CourseMock.courses.findIndex((c) => c.id === id);
    if (index !== -1) {
      CourseMock.courses.splice(index, 1);
      return [HttpStatusCode.Ok];
    } else {
      return [HttpStatusCode.NotFound];
    }
  }
}
