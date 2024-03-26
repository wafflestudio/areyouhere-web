import { HttpStatusCode } from "axios";

import {
  CreateSessionRequest,
  GetSessionAbsenteesResponse,
  GetSessionAttendeesResponse,
  GetSessionsResponse,
  SessionAttendee,
  SessionWithoutId,
} from "../api/session";

import {
  DeleteMapping,
  GetMapping,
  PostMapping,
  RequestConfig,
  RequestMapping,
} from "./base.ts";
import { DatabaseMock, SessionData } from "./database.ts";

@RequestMapping("/api/session")
export class SessionMock {
  @GetMapping()
  static getSessions(config: RequestConfig) {
    const courseId = parseInt(config.params.courseId, 10);
    if (!courseId) {
      return [HttpStatusCode.BadRequest];
    }

    const course = DatabaseMock.courses.find((c) => c.id === courseId);
    if (!course) {
      return [HttpStatusCode.NotFound];
    }

    return [
      HttpStatusCode.Ok,
      {
        allSessionAttendanceInfo: course.sessions.map((s) => ({
          id: s.id,
          name: s.name,
          absentee: s.attendances.filter((a) => !a.attendanceStatus).length,
          attendee: s.attendances.filter((a) => a.attendanceStatus).length,
          date: s.startDate,
        })),
      } as GetSessionsResponse,
    ];
  }

  @GetMapping("/:sessionId")
  static getSession(config: RequestConfig) {
    const sessionId = parseInt(config.pathParams.sessionId, 10);
    const session = DatabaseMock.courses
      .flatMap((c) => c.sessions)
      .find((s) => s.id === sessionId);
    if (session != null) {
      return [
        HttpStatusCode.Ok,
        {
          date: session.startDate,
          attendee: session.attendances.filter((a) => a.attendanceStatus)
            .length,
          name: session.name,
          absentee: session.attendances.filter((a) => !a.attendanceStatus)
            .length,
        } as SessionWithoutId,
      ];
    } else {
      return [HttpStatusCode.NoContent];
    }
  }

  @GetMapping("/:sessionId/attendee")
  static getAttendees(config: RequestConfig) {
    const sessionId = parseInt(config.pathParams.sessionId, 10);

    const course = DatabaseMock.courses.find((c) =>
      c.sessions.some((s) => s.id === sessionId)
    );
    if (!course) {
      return [HttpStatusCode.NotFound];
    }

    const session = course.sessions.find((s) => s.id === sessionId);
    if (!session) {
      return [HttpStatusCode.NotFound];
    }

    const sessionAttendees = session.attendances.map(
      (a) =>
        ({
          attendanceId: a.id,
          attendee: course.attendees.find((att) => att.id === a.attendeeId),
          attendanceStatus: a.attendanceStatus,
          attendanceTime: a.date,
        }) as SessionAttendee
    );

    if (sessionAttendees.length > 0) {
      return [
        HttpStatusCode.Ok,
        { sessionAttendees: sessionAttendees } as GetSessionAttendeesResponse,
      ];
    } else {
      return [HttpStatusCode.NoContent];
    }
  }

  @GetMapping("/:sessionId/absentee")
  static getAbsentees(config: RequestConfig) {
    const sessionId = parseInt(config.pathParams.sessionId, 10);

    const course = DatabaseMock.courses.find((c) =>
      c.sessions.some((s) => s.id === sessionId)
    );
    if (!course) {
      return [HttpStatusCode.NotFound];
    }

    const session = course.sessions.find((s) => s.id === sessionId);
    if (!session) {
      return [HttpStatusCode.NotFound];
    }

    const sessionAbsentees = session.attendances
      .map(
        (a) =>
          ({
            attendanceId: a.id,
            attendee: course.attendees.find((att) => att.id === a.attendeeId),
            attendanceStatus: a.attendanceStatus,
            attendanceTime: a.date,
          }) as SessionAttendee
      )
      .filter((a) => !a.attendanceStatus);

    if (sessionAbsentees.length > 0) {
      return [
        HttpStatusCode.Ok,
        { sessionAttendees: sessionAbsentees } as GetSessionAbsenteesResponse,
      ];
    } else {
      return [HttpStatusCode.NoContent];
    }
  }

  @PostMapping()
  static createSession(config: RequestConfig) {
    const data = JSON.parse(config.data) as CreateSessionRequest;
    const course = DatabaseMock.courses.find((c) => c.id === data.courseId);
    if (!course) {
      return [HttpStatusCode.NotFound];
    }

    const session = {
      id: DatabaseMock.nextSessionId++,
      name: data.sessionName,
      startDate: new Date(),
      attendances: course.attendees.map((a) => ({
        id: DatabaseMock.nextAttendanceId++,
        attendeeId: a.id,
        attendanceStatus: false,
        date: new Date(),
      })),
    } as SessionData;

    course.sessions.push(session);

    return [HttpStatusCode.Ok];
  }

  @DeleteMapping()
  static deleteSession(config: RequestConfig) {
    const sessionId = config.params.sessionId;

    const course = DatabaseMock.courses.find((c) =>
      c.sessions.some((s) => s.id === sessionId)
    );
    if (!course) {
      return [HttpStatusCode.NoContent];
    }

    const sessionIndex = course.sessions.findIndex((s) => s.id === sessionId);
    if (sessionIndex === -1) {
      return [HttpStatusCode.NoContent];
    }

    course.sessions.splice(sessionIndex, 1);
    return [HttpStatusCode.Ok];
  }
}
