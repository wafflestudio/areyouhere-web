import axios, { HttpStatusCode } from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

const mock = new AxiosMockAdapter(axios);

let logined = true;

mock.onPost("/api/user").reply((_) => {
  console.log("post /api/user");
  logined = true;
  return [HttpStatusCode.Ok];
});

mock.onPost("/api/user/login").reply((config) => {
  const data = JSON.parse(config.data);
  if (data.email === "test@example.com") {
    logined = true;
    return [HttpStatusCode.Ok];
  } else {
    return [HttpStatusCode.BadRequest];
  }
});

mock.onGet("/api/user/logout").reply((_) => {
  logined = false;
  return [HttpStatusCode.Ok];
});

mock.onGet("/api/user").reply((_) => {
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

mock.onGet(/\/api\/user\/.+/).reply((config) => {
  const email = config.url?.split("/").pop();
  if (email === "test@example.com") {
    return [HttpStatusCode.Conflict];
  } else {
    return [HttpStatusCode.Ok];
  }
});
