import { HttpStatusCode } from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

import { CreateSessionRequest } from "../api/session";

const sessions = [
  {
    id: 1,
    name: "Session 1",
    date: new Date().toISOString(),
    attendee: 10,
    absentee: 2,
  },
  {
    id: 2,
    name: "Session 2",
    date: new Date().toISOString(),
    attendee: 8,
    absentee: 4,
  },
];

// Mock data for a single session
const singleSession = {
  name: "Session 1",
  date: new Date().toISOString(),
  attendee: 10,
  absentee: 2,
};

const sessionAttendees = [
  {
    attendeeId: 1,
    attendeeName: "Attendee 1",
    attendanceStatus: true,
    attendanceTime: new Date().toISOString(),
  },
  {
    attendeeId: 2,
    attendeeName: "Attendee 2",
    attendanceStatus: false,
    attendanceTime: new Date().toISOString(),
  },
];

function addSessionMock(mock: AxiosMockAdapter) {
  // Mock GET request for session attendees
  mock.onGet(/\/api\/session\/detail\/attendee\/\d+/).reply((config) => {
    const sessionId = parseInt(config.url?.split("/").pop() || "0");
    if (sessionId === 1) {
      return [200, { sessionAttendees }];
    } else {
      return [404];
    }
  });

  // Mock GET request for session absentees only
  mock.onGet(/\/api\/session\/detail\/absentee\/\d+/).reply((config) => {
    const sessionId = parseInt(config.url?.split("/").pop() || "0");
    if (sessionId === 1) {
      return [
        200,
        {
          sessionAttendees: sessionAttendees.filter((a) => !a.attendanceStatus),
        },
      ];
    } else {
      return [404];
    }
  });

  // Mock GET request for sessions
  mock.onGet(/\/api\/session\/\d+/).reply((config) => {
    const courseId = parseInt(config.url?.split("/").pop() || "0");
    if (courseId === 1) {
      return [
        HttpStatusCode.Ok,
        {
          sessionAttendanceInfos: sessions,
        },
      ];
    } else {
      return [HttpStatusCode.NoContent];
    }
  });

  // Mock GET request for a single session
  mock.onGet(/\/api\/session\/detail\/\d+/).reply((config) => {
    const sessionId = parseInt(config.url?.split("/").pop() || "0");
    if (sessionId === 1) {
      return [HttpStatusCode.Ok, singleSession];
    } else {
      return [HttpStatusCode.NoContent];
    }
  });

  // create
  mock.onPost("/api/session").reply((config) => {
    const data = JSON.parse(config.data) as CreateSessionRequest;
    sessions.push({
      id: Date.now(),
      name: data.sessionName,
      date: new Date().toISOString(),
      attendee: Math.floor(Math.random() * 10),
      absentee: Math.floor(Math.random() * 10),
    });
    return [HttpStatusCode.Ok];
  });
}

export default addSessionMock;
