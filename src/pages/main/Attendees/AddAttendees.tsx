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
    let namesakes: PickPartial<AttendeeInfo, "id">[][] = [];
    attendeeList.forEach((name) => {
      if (nameMap.has(name)) {
        const idx = nameMap.get(name)!;
        namesakes[idx].push({ name, note: "" });
      } else {
        nameMap.set(name, namesakes.length);
        namesakes.push([{ name, note: "" }]);
      }
    });

    // 2. get namesakes from existing attendees
    const duplicatedAttendees = await getDuplicatedAttendee({
      courseId: classId,
      newAttendees: attendeeList,
    });

    const duplicatedAttendeeList = duplicatedAttendees.data.duplicatedAttendees;

    duplicatedAttendeeList.forEach((attendee) => {
      const id = attendee.id;
      const name = attendee.name;
      const note = attendee.note;
      if (id) {
        if (nameMap.has(name)) {
          const idx = nameMap.get(name)!;
          namesakes[idx].push({ id, name, note });
        } else {
          nameMap.set(name, namesakes.length);
          namesakes.push([{ id, name, note }]);
        }
      }
    });

    // 3. remove one names
    namesakes = namesakes.filter((namesake) => namesake.length > 1);

    console.log(namesakes);

    // 4. if namesakes exist, open modal
    if (namesakes.length > 0) {
      setNamesakes(namesakes);
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

  return (
    <>
      <NamesakeModal
        state={namesakeModalState}
        namesakes={namesakes}
        close={closeNamesakeModal}
        onNamesakeChanged={setNamesakes}
        onSubmitted={() => {
          createAttendees({
            courseId: classId!,
            newAttendees: namesakes.flat(),
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
            disabled={attendeeList.length === 0}
            onClick={submit}
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
