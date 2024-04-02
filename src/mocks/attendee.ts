import { HttpStatusCode } from "axios";

import {
  CreateAttendeeRequest,
  DeleteAttendeeRequest,
  GetAttendeeDuplicateRequest,
  GetAttendeeDuplicateResponse,
  GetAttendeeResult,
  GetAttendeesResponse,
  UpdateAttendeeRequest,
} from "../api/attendee";
import { AttendeeInfo, PickPartial } from "../type.ts";

import {
  GetMapping,
  PostMapping,
  PutMapping,
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

  @GetMapping("/detail")
  static getAttendee(config: RequestConfig) {
    const attendeeId = parseInt(config.params.attendeeId, 10);
    if (isNaN(attendeeId)) {
      return [HttpStatusCode.BadRequest];
    }

    const course = DatabaseMock.courses.find((c) =>
      c.attendees.some((a) => a.id === attendeeId)
    );
    if (!course) {
      return [HttpStatusCode.NotFound];
    }

    const attendee = course.attendees.find((a) => a.id === attendeeId);
    if (!attendee) {
      return [HttpStatusCode.NotFound];
    }

    const attendanceInfo = course.sessions.map((session) => {
      const sessionAttendance = session.attendances.find(
        (a) => a.attendeeId === attendeeId
      );
      return {
        attendanceId: sessionAttendance?.id || -1,
        sessionName: session.name,
        attendanceStatus: sessionAttendance?.attendanceStatus || false,
        attendanceTime: sessionAttendance?.date || new Date(),
      };
    });

    return [
      HttpStatusCode.Ok,
      {
        attendee: attendee,
        attendance: attendanceInfo.filter((a) => a.attendanceStatus).length,
        absence: attendanceInfo.filter((a) => !a.attendanceStatus).length,
        attendanceInfo,
      } as GetAttendeeResult,
    ];
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

  @PutMapping()
  static updateAttendee(config: RequestConfig) {
    const data = JSON.parse(config.data) as UpdateAttendeeRequest;
    const course = DatabaseMock.courses.find((c) => c.id === data.courseId);
    if (!course) {
      return [HttpStatusCode.NotFound];
    }

    // check duplicate
    const updateIds = new Set(data.updatedAttendees.map((a) => a.id));
    const notChangedAttendees = course.attendees.filter(
      (a) => !updateIds.has(a.id)
    );
    const nameNoteCounts: Record<string, number> = {};
    [...notChangedAttendees, ...data.updatedAttendees].forEach((attendee) => {
      const key = `${attendee.name}\t${attendee.note}`;
      const count = nameNoteCounts[key] || 0;
      nameNoteCounts[key] = count + 1;
    });

    console.log(nameNoteCounts);
    if (Object.values(nameNoteCounts).some((count) => count > 1)) {
      return [HttpStatusCode.BadRequest];
    }

    // update by id
    course.attendees = course.attendees.map((attendee) => {
      const newAttendee = data.updatedAttendees.find(
        (a) => a.id === attendee.id
      );
      return newAttendee || attendee;
    });
    DatabaseMock.update();
    return [HttpStatusCode.Ok];
  }

  @PostMapping("/duplicate")
  static getDuplicatedAttendees(config: RequestConfig) {
    const data = JSON.parse(config.data) as GetAttendeeDuplicateRequest;
    console.log(data);
    const course = DatabaseMock.courses.find((c) => c.id === data.courseId);
    if (!course) {
      return [HttpStatusCode.NotFound];
    }

    const keyFn = (attendee: { name?: string; note?: string }) =>
      `${attendee.name ?? ""}@${attendee.note ?? ""}`;

    const nameCounts: Record<string, { name: string; count: number }> = {};
    [
      ...data.newAttendees.map((e) => ({ name: e })),
      ...course.attendees,
    ].forEach((attendee) => {
      console.log(attendee);
      const key = keyFn(attendee);
      const data = nameCounts[key] || { name: attendee.name, count: 0 };
      nameCounts[key] = { name: attendee.name, count: data.count + 1 };
    });

    const duplicatedNames = Object.entries(nameCounts)
      .filter(([_, data]) => data.count > 1)
      .map(([_, data]) => data.name);

    const duplicatedAttendees: PickPartial<AttendeeInfo, "id">[] = [];
    data.newAttendees.forEach((attendee) => {
      if (duplicatedNames.includes(attendee)) {
        duplicatedAttendees.push({ name: attendee });
      }
    });
    course.attendees.forEach((attendee) => {
      if (duplicatedNames.includes(attendee.name)) {
        duplicatedAttendees.push({
          id: attendee.id,
          name: attendee.name,
          note: attendee.note,
        });
      }
    });

    return [
      HttpStatusCode.Ok,
      { duplicatedAttendees } as GetAttendeeDuplicateResponse,
    ];
  }
}
