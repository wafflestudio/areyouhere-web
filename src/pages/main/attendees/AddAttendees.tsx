import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import {
  createAttendee,
  getDuplicatedAttendee,
} from "../../../api/attendee.ts";
import AddAttendeesChip from "../../../components/attendees/AddAttendeesChip.tsx";
import { PrimaryButton } from "../../../components/Button.tsx";
import NamesakeModal from "../../../components/class/NamesakeModal.tsx";
import TitleBar from "../../../components/TitleBar";
import useModalState from "../../../hooks/modal.tsx";
import useSubmitHandler from "../../../hooks/submitHandler.tsx";
import { useClassId } from "../../../hooks/urlParse.tsx";
import { AttendeeInfo, PickPartial } from "../../../type.ts";

function AddAttendees() {
  const navigate = useNavigate();

  const [attendeeList, setAttendeeList] = useState<string[]>([]);

  const [namesakes, setNamesakes] = useState<
    PickPartial<AttendeeInfo, "id">[][]
  >([]);
  const [namesakeModalState, openNamesakeModal, closeNamesakeModal] =
    useModalState();

  // 유저 추가 api
  const classId = useClassId();
  const queryClient = useQueryClient();
  const { mutate: createAttendees } = useMutation({
    mutationFn: createAttendee,
    mutationKey: ["createAttendee"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attendees", classId] });
    },
  });

  const submit = async () => {
    // 1. arrange by name
    const nameMap = new Map<string, number>();
    const namesakeArray: PickPartial<AttendeeInfo, "id">[][] = [];
    attendeeList.forEach((name, index) => {
      if (nameMap.has(name)) {
        const idx = nameMap.get(name)!;
        namesakeArray[idx].push({ name, note: "", index: index });
      } else {
        nameMap.set(name, namesakeArray.length);
        namesakeArray.push([{ name, note: "", index: index }]);
      }
    });

    // 2. get namesakes from existing attendees
    const { duplicatedAttendees } = await getDuplicatedAttendee({
      courseId: classId,
      newAttendees: attendeeList,
    });

    duplicatedAttendees.forEach((attendee) => {
      const id = attendee.id;
      const name = attendee.name;
      const note = attendee.note;
      if (id) {
        if (nameMap.has(name)) {
          const idx = nameMap.get(name)!;
          namesakeArray[idx].push({ id, name, note });
        } else {
          nameMap.set(name, namesakeArray.length);
          namesakeArray.push([{ id, name, note }]);
        }
      }
    });

    // 2. filter namesakes
    const filteredNamesakes: PickPartial<AttendeeInfo, "id">[][] =
      namesakeArray.filter((namesake) => namesake.length > 1);

    // 3. if namesakes exist, open modal
    if (filteredNamesakes.length > 0) {
      setNamesakes(filteredNamesakes);
      openNamesakeModal();
      return;
    }

    // 4-1. if namesakes do not exist, add attendees
    createAttendees({
      courseId: classId!,
      newAttendees: attendeeList.map(
        (name) => ({ name, note: "" }) as Omit<AttendeeInfo, "id">
      ),
    });
    navigate(-1);
  };

  const { isSubmitting, handleSubmit } = useSubmitHandler();

  return (
    <>
      <NamesakeModal
        state={namesakeModalState}
        close={closeNamesakeModal}
        initialNamesakes={namesakes}
        attendeeList={attendeeList}
        onSubmit={(attendees) => {
          createAttendees({
            courseId: classId!,
            newAttendees: attendees,
          });
          closeNamesakeModal();
          navigate(-1);
        }}
      />
      <Container>
        <TitleBar label="Add New Attendees" />
        <AddAttendeesContainer>
          <AddAttendeesChip
            attendeeList={attendeeList}
            setAttendeeList={setAttendeeList}
          />
          <PrimaryButton
            style={{ width: "45rem" }}
            disabled={attendeeList.length === 0 || isSubmitting}
            onClick={() => handleSubmit(submit)}
          >
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
