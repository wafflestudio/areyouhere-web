import { HttpStatusCode } from "axios";

import {
  AttendanceMultipleChoicesResponse,
  AttendanceOneChoiceResponse,
  AttendanceRequest,
  UpdateAttendanceStatusRequest,
} from "../api/attendance";
import { AttendeeInfo } from "../type.ts";

import {
  GetMapping,
  PostMapping,
  PutMapping,
  RequestConfig,
  RequestMapping,
} from "./base.ts";
import { DatabaseMock } from "./database.ts";

@RequestMapping("/api/attendance")
export class AttendanceMock {
  @PostMapping()
  static attend(config: RequestConfig) {
    const data = JSON.parse(config.data) as AttendanceRequest;
    const course = DatabaseMock.courses.find((c) =>
      c.sessions.some((s) => s.authCode === data.authCode)
    );

    if (!course) {
      return [HttpStatusCode.NotFound];
    }

    const session = course.sessions.find((s) => s.authCode === data.authCode);
    if (!session) {
      return [HttpStatusCode.NotFound];
    }

    let attendee: AttendeeInfo | undefined;
    if (data.attendeeId != null) {
      attendee = course.attendees.find((a) => a.id === data.attendeeId);
    } else {
      // Find if there are multiple attendees with the same name
      const attendees = course.attendees.filter(
        (a) => a.name === data.attendeeName
      );
      if (attendees.length === 0) {
        return [HttpStatusCode.NoContent];
      }

      if (attendees.length > 1) {
        // If there are multiple attendees with the same name, return the list of attendees
        return [
          HttpStatusCode.Conflict,
          {
            attendeeNotes: attendees.map((a) => ({
              id: a.id,
              note: a.note,
            })),
          } as AttendanceMultipleChoicesResponse,
        ];
      }

      attendee = attendees[0];
    }

    if (attendee == null) {
      return [HttpStatusCode.NoContent];
    }

    const attendanceInfo = session.attendances.find(
      (a) => a.attendeeId === attendee?.id
    );

    if (attendanceInfo == null) {
      return [HttpStatusCode.InternalServerError];
    }

    if (attendanceInfo.attendanceStatus) {
      return [HttpStatusCode.BadRequest];
    }

    attendanceInfo.attendanceStatus = true;
    attendanceInfo.date = new Date();
    DatabaseMock.update();
    return [
      HttpStatusCode.Ok,
      {
        attendanceName: attendee.name,
        sessionName: session.name,
        courseName: course.name,
        attendanceTime: new Date(),
      } as AttendanceOneChoiceResponse,
    ];
  }

  @GetMapping()
  static getAttendanceStatus(config: RequestConfig) {
    const course = DatabaseMock.courses.find(
      (c) => c.id === parseInt(config.params.courseId, 10)
    );
    if (!course) {
      return [HttpStatusCode.NotFound];
    }

    const session = course.sessions.find(
      (s) => s.id === parseInt(config.params.sessionId, 10)
    );
    if (!session) {
      return [HttpStatusCode.NotFound];
    }

    return [
      HttpStatusCode.Ok,
      {
        attendances: session.attendances.filter((a) => a.attendanceStatus)
          .length,
        total: course.attendees.length,
      },
    ];
  }

  @PutMapping()
  static updateAttendances(config: RequestConfig) {
    const data = JSON.parse(config.data) as UpdateAttendanceStatusRequest;
    DatabaseMock.courses.forEach((course) => {
      course.sessions.forEach((session) => {
        session.attendances.forEach((attendance) => {
          data.updateAttendances.forEach((update) => {
            if (attendance.id === update.attendanceId) {
              attendance.attendanceStatus = update.attendanceStatus;
            }
          });
        });
      });
    });
    DatabaseMock.update();

    return [HttpStatusCode.Ok];
  }
}
