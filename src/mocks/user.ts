import { HttpStatusCode } from "axios";

import { SignInRequest, SignUpRequest } from "../api/user.ts";

import {
  GetMapping,
  PostMapping,
  RequestConfig,
  RequestMapping,
} from "./base.ts";

@RequestMapping("/api/auth")
export class AuthMock {
  private static currentUser = -1;
  private static users = [
    {
      email: "test@example.com",
      name: "test user",
      password: "testtest",
    },
  ];

  @PostMapping("/signup")
  static signUp(config: RequestConfig) {
    const data = JSON.parse(config.data) as SignUpRequest;
    this.users.push({
      email: data.email,
      name: data.nickname,
      password: data.password,
    });
    return [HttpStatusCode.Ok];
  }

  @PostMapping("/login")
  static login(config: RequestConfig) {
    const data = JSON.parse(config.data) as SignInRequest;
    for (let i = 0; i < this.users.length; i++) {
      const user = this.users[i];
      if (user.email === data.email) {
        if (user.password === data.password) {
          this.currentUser = i;
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
    this.currentUser = -1;
    return [HttpStatusCode.Ok];
  }

  @GetMapping("/me")
  static me() {
    if (this.currentUser !== -1) {
      return [
        HttpStatusCode.Ok,
        {
          email: this.users[this.currentUser].email,
          name: this.users[this.currentUser].name,
        },
      ];
    } else {
      return [HttpStatusCode.Unauthorized];
    }
  }

  @GetMapping("/email-availability")
  static emailAvailability(config: RequestConfig) {
    const email = config.params.email;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].email === email) {
        return [HttpStatusCode.Conflict];
      }
    }
    return [HttpStatusCode.Ok];
  }
}
