import { HttpStatusCode } from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

import { AttendanceRequest } from "../api/attendance";

function addAttendanceMock(mock: AxiosMockAdapter) {
  mock.onPost("/api/attendance").reply((config) => {
    const data = JSON.parse(config.data) as AttendanceRequest;
    if (data.authCode === "1234") {
      return [HttpStatusCode.Ok];
    } else {
      return [HttpStatusCode.NoContent];
    }
  });

  // /api/attendance/:courseId/:sessionId
  mock.onGet(/\/api\/attendance\/\d+\/\d+/).reply((config) => {
    return [HttpStatusCode.Ok, { attendances: 10, total: 20 }];
  });
}

export default addAttendanceMock;
