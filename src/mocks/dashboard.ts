import { HttpStatusCode } from "axios";

import { CurrentSessionInfo } from "../api/dashboard.ts";

import { GetMapping, RequestConfig, RequestMapping } from "./base.ts";
import { DatabaseMock } from "./database.ts";

@RequestMapping("/api/course/:courseId/dashboard")
export class DashboardMock {
  @GetMapping()
  static getCurrentSessionInfo(config: RequestConfig) {
    const courseId = parseInt(config.pathParams.courseId, 10);
    const course = DatabaseMock.courses.find((c) => c.id === courseId);
    if (!course) {
      return [HttpStatusCode.NotFound];
    }

    const currentSession = course.sessions.find(
      (s) => s.startDate != null && s.endDate == null
    );

    if (!currentSession) {
      return [HttpStatusCode.NoContent];
    }

    return [
      HttpStatusCode.Ok,
      {
        sessionTime: currentSession.startDate,
        authCode: currentSession.authCode,
        sessionName: currentSession.name,
        id: currentSession.id,
      } as CurrentSessionInfo,
    ];
  }

  @GetMapping("/session")
  static getPreviousSessions(config: RequestConfig) {
    const courseId = parseInt(config.pathParams.courseId, 10);
    const course = DatabaseMock.courses.find((c) => c.id === courseId);

    if (!course) {
      return [HttpStatusCode.NotFound];
    }

    const previousSessions = course.sessions
      .filter((s) => s.startDate != null && s.endDate != null)
      .slice(0, 5)
      .map((s) => ({
        id: s.id,
        name: s.name,
        date: s.startDate,
        attendee: s.attendances.filter((a) => a.attendanceStatus).length,
        absentee: s.attendances.filter((a) => !a.attendanceStatus).length,
      }));

    return [
      HttpStatusCode.Ok,
      {
        sessionAttendanceInfos: previousSessions,
      },
    ];
  }
}
