import { HttpStatusCode } from "axios";

import {
  AttendanceRequest,
  AttendanceResponse,
  UpdateAttendeeRequest,
} from "../api/attendance";

import {
  GetMapping,
  PostMapping,
  PutMapping,
  RequestConfig,
  RequestMapping,
} from "./base.ts";
import { SessionMock } from "./session.ts";

@RequestMapping("/api/attendance")
export class AttendanceMock {
  @PostMapping()
  static attend(config: RequestConfig) {
    const data = JSON.parse(config.data) as AttendanceRequest;
    if (data.authCode === "1234") {
      return [
        HttpStatusCode.Ok,
        {
          attendanceName: "User 1",
          sessionName: "Session 1",
          courseName: "Course 1",
          attendanceTime: new Date(),
        } as AttendanceResponse,
      ];
    } else {
      return [HttpStatusCode.NoContent];
    }
  }

  @GetMapping()
  static getAttendanceStatus() {
    return [HttpStatusCode.Ok, { attendances: 10, total: 20 }];
  }

  @PutMapping()
  static updateAttendances(config: RequestConfig) {
    const data = JSON.parse(config.data) as UpdateAttendeeRequest;

    data.updateAttendances.forEach((update) => {
      const sessionAttendee = Object.values(SessionMock.sessionAttendees)
        .flat()
        .find((a) => a.attendanceId === update.attendanceId);
      if (sessionAttendee) {
        sessionAttendee.attendanceStatus = update.attendanceStatus;
      }
    });

    return [HttpStatusCode.Ok];
  }
}
