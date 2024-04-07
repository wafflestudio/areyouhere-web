import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import AuthRequiredRoute from "./components/admin/AuthRequiredRoute.tsx";
import SignIn from "./pages/admin/SignIn";
import SignUp from "./pages/admin/SignUp";
import ClassList from "./pages/class/ClassList.tsx";
import CreateClass from "./pages/class/CreateClass.tsx";
import Home from "./pages/Home";
import AddAttendees from "./pages/main/Attendees/AddAttendees.tsx";
import AttendeeDetail from "./pages/main/Attendees/AttendeeDetail.tsx";
import Attendees from "./pages/main/Attendees/Attendees.tsx";
import CodePopup from "./pages/main/dashboard/CodePopup.tsx";
import Dashboard from "./pages/main/dashboard/Dashboard.tsx";
import SessionDetail from "./pages/main/session/SessionDetail.tsx";
import Sessions from "./pages/main/session/Sessions.tsx";
import Settings from "./pages/main/Settings.tsx";
import Statistics from "./pages/main/Statistics.tsx";
import Result from "./pages/Result";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/result", element: <Result /> },
      { path: "/admin/signin", element: <SignIn /> },
      { path: "/admin/signup", element: <SignUp /> },
      {
        path: "/",
        element: <AuthRequiredRoute />,
        children: [
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
