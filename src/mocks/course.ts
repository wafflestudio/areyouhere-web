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
import { DatabaseMock } from "./database.ts";

@RequestMapping("/api/course")
export class CourseMock {
  @GetMapping()
  static getCourses() {
    return [
      HttpStatusCode.Ok,
      {
        courses: DatabaseMock.courses.map((c) => ({
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
    const course = DatabaseMock.courses.find((c) => c.id === id);
    if (course) {
      return [
        HttpStatusCode.Ok,
        {
          id: course.id,
          name: course.name,
          description: course.description,
          allowOnlyRegistered: course.allowOnlyRegistered,
        } as Course,
      ];
    } else {
      return [HttpStatusCode.NotFound];
    }
  }

  @PostMapping()
  static createCourse(config: RequestConfig) {
    const data = JSON.parse(config.data) as CourseCreationRequest;
    DatabaseMock.courses.push({
      id: DatabaseMock.nextCourseId++,
      name: data.name,
      description: data.description,
      allowOnlyRegistered: data.onlyListNameAllowed,
      attendees: data.attendees.map((a, i) => ({
        ...a,
        id: i + 1,
      })),
      sessions: [],
    });
    DatabaseMock.update();
    return [HttpStatusCode.Ok];
  }

  @PutMapping("/:id")
  static updateCourse(config: RequestConfig) {
    const id = parseInt(config.pathParams.id, 10);
    const data = JSON.parse(config.data) as CourseUpdateRequest;
    const course = DatabaseMock.courses.find((c) => c.id === id);
    if (course) {
      course.name = data.name;
      course.description = data.description;
      course.allowOnlyRegistered = data.onlyListNameAllowed;
      DatabaseMock.update();
      return [HttpStatusCode.Ok];
    } else {
      return [HttpStatusCode.NotFound];
    }
  }

  @DeleteMapping("/:id")
  static deleteCourse(config: RequestConfig) {
    const id = parseInt(config.pathParams.id, 10);
    const index = DatabaseMock.courses.findIndex((c) => c.id === id);
    if (index !== -1) {
      DatabaseMock.courses.splice(index, 1);
      DatabaseMock.update();
      return [HttpStatusCode.Ok];
    } else {
      return [HttpStatusCode.NotFound];
    }
  }
}
