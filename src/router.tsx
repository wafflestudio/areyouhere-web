import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import AuthRequiredRoute from "./components/AuthRequiredRoute";
import SignIn from "./pages/admin/SignIn";
import SignUp from "./pages/admin/SignUp";
import ClassList from "./pages/class/ClassList.tsx";
import CreateClass from "./pages/class/CreateClass.tsx";
import Home from "./pages/Home";
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
        path: "/admin",
        element: <AuthRequiredRoute />,
        children: [
          // TODO: add admin pages
          { path: "/admin", element: <div>Admin</div> },
        ],
      },
      { path: "/class", element: <ClassList /> },
      { path: "/class/create", element: <CreateClass /> },
      { path: "/class/:classId", element: <ClassList /> },
    ],
  },
]);

export default router;
