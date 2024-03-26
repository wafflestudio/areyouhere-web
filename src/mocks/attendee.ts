import { HttpStatusCode } from "axios";

import {
  CreateAttendeeRequest,
  DeleteAttendeeRequest,
  GetAttendeeDuplicateResponse,
  GetAttendeesResponse,
} from "../api/attendee";
import { AttendeeInfo, PickPartial } from "../type.ts";

import {
  GetMapping,
  PostMapping,
  RequestConfig,
  RequestMapping,
} from "./base.ts";
import { DatabaseMock } from "./database.ts";

@RequestMapping("/api/attendee")
export class AttendeeMock {
  @GetMapping()
  static getAttendees(config: RequestConfig) {
    const courseId = parseInt(config.params.courseId, 10);
    if (isNaN(courseId)) {
      return [HttpStatusCode.BadRequest];
    }

    const course = DatabaseMock.courses.find((c) => c.id === courseId);
    if (!course) {
      return [HttpStatusCode.NotFound];
    }

    const classAttendees = course.attendees.map((attendee) => {
      const attendance = course.sessions.reduce(
        (acc, session) => {
          const sessionAttendance = session.attendances.find(
            (a) => a.attendeeId === attendee.id
          );
          if (sessionAttendance) {
            if (sessionAttendance.attendanceStatus) {
              acc.attendance++;
            } else {
              acc.absence++;
            }
          }
          return acc;
        },
        { attendance: 0, absence: 0 }
      );
      return { attendee, ...attendance };
    });
    return [HttpStatusCode.Ok, { classAttendees } as GetAttendeesResponse];
  }

  @PostMapping()
  static createAttendee(config: RequestConfig) {
    const data = JSON.parse(config.data) as CreateAttendeeRequest;
    const course = DatabaseMock.courses.find((c) => c.id === data.courseId);
    if (!course) {
      return [HttpStatusCode.NotFound];
    }

    data.newAttendees.forEach((attendee) => {
      course.attendees.push({
        id: DatabaseMock.nextAttendeeId++,
        name: attendee.name,
      });
    });
    DatabaseMock.update();
    return [HttpStatusCode.Ok];
  }

  @PostMapping("/delete")
  static deleteAttendee(config: RequestConfig) {
    const data = JSON.parse(config.data) as DeleteAttendeeRequest;
    DatabaseMock.courses.forEach((course) => {
      course.attendees = course.attendees.filter(
        (a) => !data.attendeeIds.includes(a.id)
      );
      course.sessions.forEach((session) => {
        session.attendances = session.attendances.filter(
          (a) => !data.attendeeIds.includes(a.attendeeId)
        );
      });
    });
    DatabaseMock.update();
    return [HttpStatusCode.Ok];
  }

  @PostMapping("/duplicate")
  static getDuplicatedAttendees(config: RequestConfig) {
    const data = JSON.parse(config.data) as CreateAttendeeRequest;
    const course = DatabaseMock.courses.find((c) => c.id === data.courseId);
    if (!course) {
      return [HttpStatusCode.NotFound];
    }

    const nameCounts: Record<string, number> = {};
    data.newAttendees.forEach((attendee) => {
      const count = nameCounts[attendee.name] || 0;
      nameCounts[attendee.name] = count + 1;
    });
    course.attendees.forEach((attendee) => {
      const count = nameCounts[attendee.name] || 0;
      nameCounts[attendee.name] = count + 1;
    });

    const duplicatedNames = Object.entries(nameCounts)
      .filter(([_, count]) => count > 1)
      .map(([name, _]) => name);

    const duplicatedAttendees: PickPartial<AttendeeInfo, "id">[] = [];
    data.newAttendees.forEach((attendee) => {
      if (duplicatedNames.includes(attendee.name)) {
        duplicatedAttendees.push({ name: attendee.name });
      }
    });
    course.attendees.forEach((attendee) => {
      if (duplicatedNames.includes(attendee.name)) {
        duplicatedAttendees.push({
          id: attendee.id,
          name: attendee.name,
        });
      }
    });

    return [
      HttpStatusCode.Ok,
      { duplicatedAttendees } as GetAttendeeDuplicateResponse,
    ];
  }
}
