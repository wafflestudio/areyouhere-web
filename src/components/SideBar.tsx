import { useNavigate, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

import attendeesDefault from "../assets/sidebar/attendeesDefault.svg";
import attendeesHover from "../assets/sidebar/attendeesHover.svg";
import attendeesOnClick from "../assets/sidebar/attendeesOnClick.svg";
import classListDefault from "../assets/sidebar/classListDefault.svg";
import classListHover from "../assets/sidebar/classListHover.svg";
import dashboardDefault from "../assets/sidebar/dashBoardDefault.svg";
import dashboardHover from "../assets/sidebar/dashBoardHover.svg";
import dashboardOnClick from "../assets/sidebar/dashBoardOnClick.svg";
import logo from "../assets/sidebar/logo.svg";
import sessionsDefault from "../assets/sidebar/sessionsDefault.svg";
import sessionsHover from "../assets/sidebar/sessionsHover.svg";
import sessionsOnClick from "../assets/sidebar/sessionsOnClick.svg";
import settingsDefault from "../assets/sidebar/settingsDefault.svg";
import settingsHover from "../assets/sidebar/settingsHover.svg";
import settingsOnClick from "../assets/sidebar/settingsOnClick.svg";
import statisticsDefault from "../assets/sidebar/statisticsDefault.svg";
import statisticsHover from "../assets/sidebar/statisticsHover.svg";
import statisticsOnClick from "../assets/sidebar/statisticsOnClick.svg";
import Theme from "../styles/Theme.tsx";

interface MenuItem {
  path: string;
  defaultIcon: string;
  hoverIcon: string;
  onClickIcon: string;
}

function SideBar() {
  const navigate = useNavigate();
  const location = useLocation().pathname;

  const { classId } = useParams();

  const menuItems = [
    {
      path: "/class",
      defaultIcon: classListDefault,
      hoverIcon: classListHover,
      onClickIcon: classListDefault,
    },
    {
      path: `/class/${classId}`,
      defaultIcon: dashboardDefault,
      hoverIcon: dashboardHover,
      onClickIcon: dashboardOnClick,
    },
    {
      path: `/class/${classId}/sessions`,
      defaultIcon: sessionsDefault,
      hoverIcon: sessionsHover,
      onClickIcon: sessionsOnClick,
    },
    {
      path: `/class/${classId}/attendees`,
      defaultIcon: attendeesDefault,
      hoverIcon: attendeesHover,
      onClickIcon: attendeesOnClick,
    },
    {
      path: `/class/${classId}/statistics`,
      defaultIcon: statisticsDefault,
      hoverIcon: statisticsHover,
      onClickIcon: statisticsOnClick,
    },
    {
      path: `/class/${classId}/settings`,
      defaultIcon: settingsDefault,
      hoverIcon: settingsHover,
      onClickIcon: settingsOnClick,
    },
  ];

  const determineIcon = (item: MenuItem) => {
    const currentPath = location.split("?")[0].split("#")[0];

    if (currentPath === "/class" && item.path === "/class") {
      return false;
    }

    if (currentPath === item.path) {
      return true;
    } else if (currentPath.startsWith(item.path) && item.path !== "/class") {
      return false;
    } else if (item.path === "/class") {
      if (currentPath.startsWith("/class/") && currentPath !== "/class") {
        return false;
      }
    }

    return false;
  };

  return (
    <Container>
      <IconContainer onClick={() => navigate("/")}>
        <img src={logo} alt="logo" />
      </IconContainer>
      {location !== "/class" &&
        menuItems.map((item, index) => {
          const urlMatches = determineIcon(item);
          return (
            <IconContainer key={index} onClick={() => navigate(item.path)}>
              <img
                src={urlMatches ? item.onClickIcon : item.defaultIcon}
                alt={`${item.path}-icon`}
                onMouseOver={(e) => {
                  if (!urlMatches) e.currentTarget.src = item.hoverIcon;
                }}
                onMouseOut={(e) => {
                  if (!urlMatches) e.currentTarget.src = item.defaultIcon;
                  else e.currentTarget.src = item.onClickIcon;
                }}
              />
            </IconContainer>
          );
        })}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 8rem;
  height: 100vh;
  padding: 4.7rem 0;
  background-color: ${Theme.colors.white};

  user-select: none;
`;

const IconContainer = styled.div`
  width: 3.4rem;
  height: 3.4rem;
  margin-bottom: 2.5rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
  }
`;

export default SideBar;
