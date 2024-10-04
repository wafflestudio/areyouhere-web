import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import AuthRequiredRoute from "./components/host/AuthRequiredRoute.tsx";
import ClassList from "./pages/class/ClassList.tsx";
import CreateClass from "./pages/class/CreateClass.tsx";
import Home from "./pages/Home";
import Email from "./pages/host/password/Email.tsx";
import ForgotPassword from "./pages/host/password/ForgotPassword.tsx";
import NewPassword from "./pages/host/password/NewPassword.tsx";
import Success from "./pages/host/password/Success.tsx";
import Verify from "./pages/host/password/Verify.tsx";
import SignIn from "./pages/host/SignIn";
import SignUp from "./pages/host/SignUp";
import Account from "./pages/main/Account.tsx";
import AddAttendees from "./pages/main/attendees/AddAttendees.tsx";
import AttendeeDetail from "./pages/main/attendees/AttendeeDetail.tsx";
import Attendees from "./pages/main/attendees/Attendees.tsx";
import CodePopup from "./pages/main/dashboard/CodePopup.tsx";
import Dashboard from "./pages/main/dashboard/Dashboard.tsx";
import SessionDetail from "./pages/main/session/SessionDetail.tsx";
import Sessions from "./pages/main/session/Sessions.tsx";
import Settings from "./pages/main/Settings.tsx";
import Statistics from "./pages/main/Statistics.tsx";
import Result from "./pages/Result";
import TermsOfUse from "./pages/TermsOfUse.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/result", element: <Result /> },
      { path: "/host/signin", element: <SignIn /> },
      { path: "/host/signup", element: <SignUp /> },
      {
        path: "/host/forgot-password",
        element: <ForgotPassword />,
        children: [
          { path: "email", element: <Email /> },
          { path: "verify", element: <Verify /> },
          { path: "new-password", element: <NewPassword /> },
          { path: "success", element: <Success /> },
        ],
      },
      { path: "/terms-of-use", element: <TermsOfUse /> },
      {
        path: "/",
        element: <AuthRequiredRoute />,
        children: [
          // 유저 계정
          { path: "/account", element: <Account /> },
          // 클래스 관련
          { path: "/class", element: <ClassList /> },
          { path: "/class/create", element: <CreateClass /> },
          // 클래스 선택 후
          { path: "/class/:classId", element: <Dashboard /> },
          { path: "/class/:classId/sessions", element: <Sessions /> },
          { path: "/class/:classId/attendees", element: <Attendees /> },
          { path: "/class/:classId/attendees/add", element: <AddAttendees /> },
          {
            path: "/class/:classId/attendee/:attendeeId",
            element: <AttendeeDetail />,
          },
          { path: "/class/:classId/statistics", element: <Statistics /> },
          { path: "/class/:classId/settings", element: <Settings /> },
          // 세션 선택 후
          {
            path: "/class/:classId/sessions/:sessionId",
            element: <SessionDetail />,
          },
          // 코드 팝업
          {
            path: "/class/:classId/sessions/:sessionId/code",
            element: <CodePopup />,
          },
        ],
      },
    ],
  },
]);

export default router;
