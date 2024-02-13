import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Theme from "../../styles/Theme.tsx";

function ClassItem() {
  const navigate = useNavigate();

  const [classId, setClassId] = useState(1);
  const [className, setClassName] = useState("Wafflestudio React seminar");
  const [description, setDescription] = useState(
    "This is class for React seminar of wafflestudio."
  );
  const [attendeeNumber, setAttendeeNumber] = useState(14);
  const [classColor, setClassColor] = useState("#ffffff");

  useEffect(() => {
    // TODO: fetch class info
  }, []);

  return (
    <Container
      style={{ backgroundColor: classColor }}
      onClick={() => navigate(`/${classId}`)}
    >
      <h4>{className}</h4>
      <p>{description}</p>
      <p>{attendeeNumber}</p>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  width: 36rem;
  height: 24rem;

  border: 0.1rem solid ${Theme.colors.grey};
  border-radius: 1rem;

  padding: 2rem;
  gap: 2rem;

  cursor: pointer;

  h4 {
    font-size: 2.4rem;
  }

  p {
    font-size: 1.6rem;
  }
`;

export default ClassItem;
