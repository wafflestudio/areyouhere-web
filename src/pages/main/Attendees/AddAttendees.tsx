import React, { useState } from "react";
import styled from "styled-components";

import AddAttendeesChip from "../../../components/attendees/AddAttendeesChip.tsx";
import { PrimaryButton } from "../../../components/Button.tsx";
import TitleBar from "../../../components/TitleBar";

function AddAttendees() {
  const [attendeeList, setAttendeeList] = useState<string[]>([]);

  return (
    <>
      <Container>
        <TitleBar label="Add New Attendees" />
        <AddAttendeesContainer>
          <AddAttendeesChip
            attendeeList={attendeeList}
            setAttendeeList={setAttendeeList}
          />
          <PrimaryButton style={{ width: "45rem" }} onClick={() => {}}>
            Add New Attendees
          </PrimaryButton>
        </AddAttendeesContainer>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const AddAttendeesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  margin-left: 6rem;

  & > * {
    margin-bottom: 3.4rem;
  }
`;

export default AddAttendees;
