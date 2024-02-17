import { Navigate, Outlet } from "react-router-dom";
import styled from "styled-components";

import { useUser } from "../../api/user.ts";
import SideBar from "../SideBar.tsx";

function AuthRequiredRoute() {
  // TODO: handle isError
  const { data: user, isLoading } = useUser();

  if (isLoading) {
    // TODO: apply design
    return <div></div>;
  } else {
    if (user) {
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
  background-color: ${({ theme }) => theme.colors.lightGrey};
  min-height: 100vh;
`;

export default AuthRequiredRoute;
