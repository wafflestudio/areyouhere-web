import axios, { HttpStatusCode } from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

const mock = new AxiosMockAdapter(axios);

let logined = false;

mock.onPost("/api/manager").reply(() => {
  console.log("post /api/manager");
  logined = true;
  return [HttpStatusCode.Ok];
});

mock.onPost("/api/manager/login").reply((config) => {
  const data = JSON.parse(config.data);
  if (data.email === "test@example.com") {
    logined = true;
    return [HttpStatusCode.Ok];
  } else {
    return [HttpStatusCode.BadRequest];
  }
});

mock.onGet("/api/manager/logout").reply(() => {
  logined = false;
  return [HttpStatusCode.Ok];
});

mock.onGet("/api/manager").reply(() => {
  if (logined) {
    return [
      HttpStatusCode.Ok,
      {
        name: "test user",
      },
    ];
  } else {
    return [HttpStatusCode.Unauthorized];
  }
});

mock.onGet(/\/api\/manager\/.+/).reply((config) => {
  const email = config.url?.split("/").pop();
  if (email === "test@example.com") {
    return [HttpStatusCode.Conflict];
  } else {
    return [HttpStatusCode.Ok];
  }
});
