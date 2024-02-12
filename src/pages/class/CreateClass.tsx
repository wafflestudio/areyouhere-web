import { useState } from "react";
import styled from "styled-components";

import TextField from "../../components/TextField.tsx";
import TitleBar from "../../components/TitleBar.tsx";

function CreateClass() {
  const [className, setClassName] = useState("");
  const [description, setDescription] = useState("");
  const [attendeeList, setAttendeeList] = useState("");

  return (
    <Container>
      <TitleBar label="Create a new class" />
      <TextFieldContainer>
        <TextField
          label="Name of your class"
          onChange={(e) => setClassName(e.target.value)}
        />
        <TextField
          label="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField label="Attendee name" />
      </TextFieldContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const TextFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  margin-left: 6rem;

  & > * {
    width: 43.5rem;
    margin-bottom: 3.4rem;
  }
`;

export default CreateClass;
