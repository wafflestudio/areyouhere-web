import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

import addCourseMock from "./course";
import addUserMock from "./user";

const mock = new AxiosMockAdapter(axios);

addUserMock(mock);
addCourseMock(mock);
