import { HttpStatusCode } from "axios";

import { CurrentSessionInfo } from "../api/dashboard.ts";

import { GetMapping, RequestMapping } from "./base.ts";

@RequestMapping("/api/course/:courseId/dashboard")
export class DashboardMock {
  static currentSessionInfo: Partial<CurrentSessionInfo> = {
    id: 1,
    sessionName: "Session Name",
    sessionTime: undefined,
    authCode: undefined,
  };

  @GetMapping()
  static getCurrentSessionInfo() {
    return [HttpStatusCode.Ok, DashboardMock.currentSessionInfo];
  }

  @GetMapping("/session")
  static getPreviousSessions() {
    return [
      HttpStatusCode.Ok,
      {
        sessionAttendanceInfos: [
          {
            id: 1,
            name: "Previous Session 1",
            date: new Date().toISOString(),
            attendee: 10,
            absentee: 2,
          },
          {
            id: 2,
            name: "Previous Session 2",
            date: new Date().toISOString(),
            attendee: 8,
            absentee: 4,
          },
        ],
      },
    ];
  }
}
