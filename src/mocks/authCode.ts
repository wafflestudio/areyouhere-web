import { HttpStatusCode } from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

import { currentSessionInfo } from "./dashboard";

function addAuthCodeMock(mock: AxiosMockAdapter) {
  mock.onPost("/api/auth-code").reply(() => {
    currentSessionInfo.authCode = "HAHA";
    currentSessionInfo.startTime = new Date();
    return [HttpStatusCode.Ok, { authCode: "HAHA" }];
  });

  mock.onPost("/api/auth-code/deactivate").reply(() => {
    currentSessionInfo.authCode = undefined;
    currentSessionInfo.startTime = undefined;
    return [HttpStatusCode.Ok];
  });
}

export default addAuthCodeMock;
