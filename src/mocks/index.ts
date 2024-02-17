import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

import addCourseMock from "./course";
import addDashboardMock from "./dashboard";
import addSessionMock from "./session";
import addUserMock from "./user";

const mock = new AxiosMockAdapter(axios);

addUserMock(mock);
addCourseMock(mock);
addDashboardMock(mock);
addSessionMock(mock);
