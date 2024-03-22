import { HttpStatusCode } from "axios";

import { PostMapping, RequestMapping } from "./base.ts";
import { DashboardMock } from "./dashboard.ts";

@RequestMapping("/api/auth-code")
export class AuthCodeMock {
  static getRandomAuthCode() {
    return Math.random().toString(36).substring(2, 6).toUpperCase();
  }

  @PostMapping()
  static createAuthCode() {
    DashboardMock.currentSessionInfo.authCode =
      AuthCodeMock.getRandomAuthCode();
    DashboardMock.currentSessionInfo.sessionTime = new Date();
    return [
      HttpStatusCode.Ok,
      { authCode: DashboardMock.currentSessionInfo.authCode },
    ];
  }

  @PostMapping("/deactivate")
  static deactivateAuthCode() {
    DashboardMock.currentSessionInfo.authCode = undefined;
    DashboardMock.currentSessionInfo.sessionTime = undefined;
    return [HttpStatusCode.Ok];
  }
}
