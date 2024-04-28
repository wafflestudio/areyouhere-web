import { HttpStatusCode } from "axios";

import { SignInRequest, SignUpRequest } from "../api/user.ts";

import {
  GetMapping,
  PostMapping,
  RequestConfig,
  RequestMapping,
} from "./base.ts";
import { DatabaseMock } from "./database.ts";

@RequestMapping("/api/auth")
export class AuthMock {
  @PostMapping("/signup")
  static signUp(config: RequestConfig) {
    const data = JSON.parse(config.data) as SignUpRequest;
    DatabaseMock.users.push({
      id: DatabaseMock.nextUserId++,
      email: data.email,
      name: data.name,
      password: data.password,
    });
    DatabaseMock.update();
    return [HttpStatusCode.Ok];
  }

  @PostMapping("/login")
  static login(config: RequestConfig) {
    const data = JSON.parse(config.data) as SignInRequest;
    for (let i = 0; i < DatabaseMock.users.length; i++) {
      const user = DatabaseMock.users[i];
      if (user.email === data.email) {
        if (user.password === data.password) {
          DatabaseMock.currentUser = i;
          DatabaseMock.update();
          return [HttpStatusCode.Ok];
        } else {
          return [HttpStatusCode.BadRequest];
        }
      }
    }
    return [HttpStatusCode.BadRequest];
  }

  @GetMapping("/logout")
  static logout() {
    DatabaseMock.currentUser = -1;
    DatabaseMock.update();
    return [HttpStatusCode.Ok];
  }

  @GetMapping("/me")
  static me() {
    if (DatabaseMock.currentUser !== -1) {
      return [
        HttpStatusCode.Ok,
        {
          email: DatabaseMock.users[DatabaseMock.currentUser].email,
          name: DatabaseMock.users[DatabaseMock.currentUser].name,
        },
      ];
    } else {
      return [HttpStatusCode.Unauthorized];
    }
  }

  @GetMapping("/email-availability")
  static emailAvailability(config: RequestConfig) {
    const email = config.params.email;
    for (let i = 0; i < DatabaseMock.users.length; i++) {
      if (DatabaseMock.users[i].email === email) {
        return [HttpStatusCode.Conflict];
      }
    }
    return [HttpStatusCode.Ok];
  }
}
