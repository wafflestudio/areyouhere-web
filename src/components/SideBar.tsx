import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import attendees from "../assets/sideBar/attendees.svg";
import dashboard from "../assets/sideBar/dashboard.svg";
import sessions from "../assets/sideBar/sessions.svg";
import settings from "../assets/sideBar/settings.svg";
import statistics from "../assets/sideBar/statistics.svg";
import Theme from "../styles/Theme.tsx";

function SideBar() {
  const navigate = useNavigate();
  // const classId = useParams();
  const classId = 1;

  return (
    <Container>
      <IconContainer onClick={() => navigate(`/class/${classId}`)}>
        <img src={dashboard} alt="dashboard" />
      </IconContainer>
      <IconContainer onClick={() => navigate(`/class/${classId}/sessions`)}>
        <img src={sessions} alt="sessions" />
      </IconContainer>
      <IconContainer onClick={() => navigate(`/class/${classId}/attendees`)}>
        <img src={attendees} alt="attendees" />
      </IconContainer>
      <IconContainer onClick={() => navigate(`/class/${classId}/statistics`)}>
        <img src={statistics} alt="statistics" />
      </IconContainer>
      <IconContainer onClick={() => navigate(`/class/${classId}/settings`)}>
        <img src={settings} alt="settings" />
      </IconContainer>
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

  width: 8.2rem;
  height: 100vh;

  padding: 4rem 0 4rem 0;

  background-color: ${Theme.colors.darkGrey};
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 5rem;
  height: 5rem;
  margin-bottom: 1rem;

  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.2);
  }
`;

export default SideBar;
