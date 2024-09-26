import { Navigate, Outlet } from "react-router-dom";
import styled from "styled-components";

import { useCourses } from "../../api/course.ts";
import { useUser } from "../../api/user.ts";
import { useClassId } from "../../hooks/urlParse.tsx";
import SideBar from "../SideBar.tsx";

function AuthRequiredRoute() {
  const { data: user, isLoading: isUserLoading } = useUser();
  const { data: classList, isLoading: isClassListLoading } = useCourses();

  const classId = useClassId();

  if (isUserLoading || isClassListLoading) {
    return <div></div>;
  }

  if (!user) {
    return <Navigate to="/admin/signin" replace />;
  }

  if (classId) {
    const isAuthorized = classList?.some(
      (classItem) => classItem.id === classId
    );

    if (!isAuthorized) {
      return <Navigate to="/class" replace />;
    }
  }

  return (
    <Container>
      <SideBar />
      <Outlet />
    </Container>
  );
}

const Container = styled.div`
  padding-left: 8.2rem;
  background-color: ${({ theme }) => theme.colors.lightGrey};
  min-height: 100vh;
`;

export default AuthRequiredRoute;
