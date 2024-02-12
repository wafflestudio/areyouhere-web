import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Result from "./pages/Result";
import SignIn from "./pages/admin/SignIn";
import SignUp from "./pages/admin/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/result", element: <Result /> },
      { path: "/admin/signin", element: <SignIn /> },
      { path: "/admin/signup", element: <SignUp /> },
    ],
  },
]);

export default router;
