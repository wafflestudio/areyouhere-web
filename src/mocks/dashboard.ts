import { HttpStatusCode } from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

export const currentSessionInfo: { [key: string]: unknown } = {
  id: 1,
  name: "Current Session",
  authCode: "HAHA",
  startTime: new Date().toISOString(),
};

// Mock data for previous sessions
const previousSessions = [
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
];

function addDashboardMock(mock: AxiosMockAdapter) {
  mock.onGet(/\/api\/course\/dashboard\/session\/\d+/).reply((config) => {
    const courseId = parseInt(config.url?.split("/")[5] || "0");
    if (courseId === 1) {
      return [
        HttpStatusCode.Ok,
        {
          sessionAttendanceInfos: previousSessions,
        },
      ];
    } else {
      return [HttpStatusCode.NoContent];
    }
  });

  mock.onGet(/\/api\/course\/dashboard\/\d+/).reply((config) => {
    const courseId = parseInt(config.url?.split("/").pop() || "0");
    console.log("courseId", config.url);
    if (courseId === 1) {
      return [HttpStatusCode.Ok, currentSessionInfo];
    } else {
      return [HttpStatusCode.NoContent];
    }
  });

  // Mock GET request for previous sessions
}

export default addDashboardMock;
