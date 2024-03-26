import { HttpStatusCode } from "axios";

import {
  CreateAuthCodeRequest,
  DeactivateAuthCodeRequest,
} from "../api/authCode.ts";

import { PostMapping, RequestConfig, RequestMapping } from "./base.ts";
import { DatabaseMock } from "./database.ts";

@RequestMapping("/api/auth-code")
export class AuthCodeMock {
  static getRandomAuthCode() {
    return Math.random().toString(36).substring(2, 6).toUpperCase();
  }

  @PostMapping()
  static createAuthCode(config: RequestConfig) {
    const data = JSON.parse(config.data) as CreateAuthCodeRequest;

    const course = DatabaseMock.courses.find((c) => c.id === data.courseId);
    if (!course) {
      return [HttpStatusCode.NotFound];
    }

    const session = course.sessions.find((s) => s.id === data.sessionId);
    if (!session) {
      return [HttpStatusCode.NotFound];
    }

    session.authCode = AuthCodeMock.getRandomAuthCode();
    session.startDate = new Date();
    DatabaseMock.update();

    return [HttpStatusCode.Ok, { authCode: session.authCode }];
  }

  @PostMapping("/deactivate")
  static deactivateAuthCode(config: RequestConfig) {
    const data = JSON.parse(config.data) as DeactivateAuthCodeRequest;

    const course = DatabaseMock.courses.find((c) => c.id === data.courseId);
    if (!course) {
      console.log("course not found");
      return [HttpStatusCode.NotFound];
    }

    const session = course.sessions.find((s) => s.id === data.sessionId);
    if (!session) {
      console.log("session not found");
      return [HttpStatusCode.NotFound];
    }

    if (session.authCode !== data.authCode) {
      return [HttpStatusCode.NotFound];
    }

    delete session.authCode;
    session.endDate = new Date();
    DatabaseMock.update();

    return [HttpStatusCode.Ok];
  }
}
