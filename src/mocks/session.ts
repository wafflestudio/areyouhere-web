import { HttpStatusCode } from "axios";

import { CreateSessionRequest, Session, SessionAttendee } from "../api/session";

import {
  DeleteMapping,
  GetMapping,
  PostMapping,
  RequestConfig,
  RequestMapping,
} from "./base.ts";

@RequestMapping("/api/session")
export class SessionMock {
  static sessions: Record<number, Session> = {
    1: {
      id: 1,
      name: "Session 1",
      date: new Date(),
      attendee: 10,
      absentee: 2,
    },
    2: {
      id: 2,
      name: "Session 2",
      date: new Date(),
      attendee: 8,
      absentee: 4,
    },
  };

  static sessionAttendees: Record<number, SessionAttendee[]> = {
    1: [
      {
        attendanceId: 1,
        attendeeName: "Attendee 1",
        attendanceStatus: true,
        attendanceTime: new Date(),
      },
      {
        attendanceId: 2,
        attendeeName: "Attendee 2",
        attendanceStatus: false,
        attendanceTime: new Date(),
      },
    ],
    2: [
      {
        attendanceId: 3,
        attendeeName: "Attendee 3",
        attendanceStatus: true,
        attendanceTime: new Date(),
      },
      {
        attendanceId: 4,
        attendeeName: "Attendee 4",
        attendanceStatus: false,
        attendanceTime: new Date(),
      },
    ],
  };

  @GetMapping()
  static getSessions() {
    return [
      HttpStatusCode.Ok,
      { allSessionAttendanceInfo: Object.values(this.sessions) },
    ];
  }

  @GetMapping("/:sessionId")
  static getSession(config: RequestConfig) {
    const sessionId = parseInt(config.pathParams.sessionId, 10);
    const session = this.sessions[sessionId];
    if (session) {
      return [HttpStatusCode.Ok, session];
    } else {
      return [HttpStatusCode.NoContent];
    }
  }

  @GetMapping("/:sessionId/attendee")
  static getAttendees(config: RequestConfig) {
    const sessionId = parseInt(config.pathParams.sessionId, 10);
    const sessionAttendees = this.sessionAttendees[sessionId];
    if (sessionAttendees) {
      return [HttpStatusCode.Ok, { sessionAttendees: sessionAttendees }];
    } else {
      return [HttpStatusCode.NoContent];
    }
  }

  @GetMapping("/:sessionId/absentee")
  static getAbsentees(config: RequestConfig) {
    const sessionId = parseInt(config.pathParams.sessionId, 10);
    if (this.sessionAttendees[sessionId]) {
      return [
        HttpStatusCode.Ok,
        {
          sessionAttendees: this.sessionAttendees[sessionId].filter(
            (a) => !a.attendanceStatus
          ),
        },
      ];
    } else {
      return [HttpStatusCode.NoContent];
    }
  }

  @PostMapping()
  static createSession(config: RequestConfig) {
    const data = JSON.parse(config.data) as CreateSessionRequest;
    const newId =
      Math.max(...Object.values(this.sessions).map((s) => s.id)) + 1;
    this.sessions[newId] = {
      id: newId,
      name: data.sessionName,
      date: new Date(),
      attendee: Math.floor(Math.random() * 10),
      absentee: Math.floor(Math.random() * 10),
    };
    this.sessionAttendees[newId] = [];
    return [HttpStatusCode.Ok];
  }

  @DeleteMapping()
  static deleteSession(config: RequestConfig) {
    const index = config.params.sessionId;
    if (this.sessions[index]) {
      delete this.sessionAttendees[index];
      delete this.sessions[index];
      return [HttpStatusCode.Ok];
    } else {
      return [HttpStatusCode.NoContent];
    }
  }
}
