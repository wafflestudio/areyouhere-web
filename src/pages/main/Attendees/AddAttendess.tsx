import React, { useState } from "react";
import styled from "styled-components";

import AddAttendeesChip from "../../../components/attendees/AddAttendeesChip.tsx";
import { PrimaryButton } from "../../../components/Button.tsx";
import TitleBar from "../../../components/TitleBar";
import { AttendeeInfo } from "../../../type.ts";

function AddAttendees() {
  const [attendeeList, setAttendeeList] = useState<string[]>([]);

  return (
    <>
      <Container>
        <TitleBar label="Add New Attendees" />
        <CreateClassContainer>
          <AddAttendeesChip
            attendeeList={attendeeList}
            setAttendeeList={setAttendeeList}
          />
          <PrimaryButton style={{ width: "45rem" }} onClick={() => {}}>
            Add New Attendees
          </PrimaryButton>
        </CreateClassContainer>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const CreateClassContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  margin-left: 3rem;

  & > * {
    margin-bottom: 3.4rem;
  }
`;

export default AddAttendees;
