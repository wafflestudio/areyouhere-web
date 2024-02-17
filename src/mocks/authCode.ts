import { HttpStatusCode } from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

function addAuthCodeMock(mock: AxiosMockAdapter) {
  mock.onPost("/api/authCode").reply(() => {
    return [HttpStatusCode.Ok, { authCode: "HAHA" }];
  });

  mock.onPost("/api/authCode/deactivate").reply(() => {
    return [HttpStatusCode.Ok];
  });
}

export default addAuthCodeMock;
