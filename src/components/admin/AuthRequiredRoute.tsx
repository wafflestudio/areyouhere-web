import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router-dom";
import styled from "styled-components";

import { User, getUser } from "../../api/user.ts";
import SideBar from "../SideBar.tsx";

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
      return (
        <Container>
          <SideBar />
          <Outlet />
        </Container>
      );
    } else {
      return <Navigate to="/admin/signin" replace />;
    }
  }
}

const Container = styled.div`
  padding-left: 8.2rem;
`;

export default AuthRequiredRoute;
