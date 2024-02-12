import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router-dom";

import { User, getUser } from "../api/user";

function AuthRequiredRoute() {
  // TODO: handle isError
  const { isLoading, data } = useQuery<User>({
    queryKey: ["user"],
    queryFn: getUser,
  });

  if (isLoading) {
    // TODO: apply design
    return <div>Loading...</div>;
  } else {
    if (data) {
      return <Outlet />;
    } else {
      return <Navigate to="/admin/signin" replace />;
    }
  }
}

export default AuthRequiredRoute;
