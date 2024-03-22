import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

import { registerMock } from "./base.ts";
import "./attendance.ts";
import "./attendee.ts";
import "./authCode.ts";
import "./course.ts";
import "./dashboard.ts";
import "./session.ts";
import "./user.ts";

const mock = new AxiosMockAdapter(axios);

registerMock(mock);
