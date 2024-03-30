import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { createCourse } from "../../api/course.ts";
import AddAttendeesChip from "../../components/attendees/AddAttendeesChip.tsx";
import { PrimaryButton } from "../../components/Button.tsx";
import NamesakeModal from "../../components/class/NamesakeModal.tsx";
import { MultiLineTextField } from "../../components/TextField.tsx";
import TitleBar from "../../components/TitleBar.tsx";
import useModalState from "../../hooks/modal.tsx";
import { AttendeeInfo, PickPartial } from "../../type.ts";

function CreateClass() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: createClass } = useMutation({
    mutationFn: createCourse,
    mutationKey: ["createClass"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      navigate("/class");
    },
  });

  const [className, setClassName] = useState("");
  const [description, setDescription] = useState("");

  const [attendeeList, setAttendeeList] = useState<string[]>([]);

  const [namesakes, setNamesakes] = useState<
    PickPartial<AttendeeInfo, "id">[][]
  >([]);
  const [namesakeModalState, openNamesakeModal, closeNamesakeModal] =
    useModalState();

  const submit = () => {
    // 1. arrange by name
    const nameMap = new Map<string, number>();
    let namesakes: PickPartial<AttendeeInfo, "id">[][] = [];
    for (let i = 0; i < attendeeList.length; i++) {
      const name = attendeeList[i];
      if (nameMap.has(name)) {
        const idx = nameMap.get(name)!;
        namesakes[idx].push({ name, note: "" });
      } else {
        nameMap.set(name, namesakes.length);
        namesakes.push([{ name, note: "" }]);
      }
    }
    // 2. remove one names
    namesakes = namesakes.filter((namesake) => namesake.length > 1);

    // 3. if namesakes exist, open modal
    if (namesakes.length > 0) {
      setNamesakes(namesakes);
      openNamesakeModal();
      return;
    }
    // 3-1. if namesakes do not exist, create class
    createClass({
      name: className,
      description,
      attendees: attendeeList.map(
        (name) =>
          ({
            name,
            note: "",
          }) as Omit<AttendeeInfo, "id">
      ),
      onlyListNameAllowed: false,
    });
  };

  return (
    <>
      <NamesakeModal
        state={namesakeModalState}
        namesakes={namesakes}
        close={closeNamesakeModal}
        onNamesakeChanged={setNamesakes}
        onSubmitted={() => {
          createClass({
            name: className,
            description,
            attendees: namesakes.flat(),
            onlyListNameAllowed: false,
          });
        }}
      />
      <Container>
        <TitleBar label="Create a New Class" />
        <CreatClassContainer>
          <MultiLineTextField
            textareaStyle={{ height: "4.5rem" }}
            label="Name of your class"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          />
          <MultiLineTextField
            textareaStyle={{ height: "12rem" }}
            label="Description"
            value={description}
            placeholder="Add a description."
            onChange={(e) => setDescription(e.target.value)}
          />
          <AddAttendeesChip
            attendeeList={attendeeList}
            setAttendeeList={setAttendeeList}
          />
          <PrimaryButton
            style={{ width: "45rem" }}
            onClick={submit}
            disabled={className === ""}
          >
            Create a New Class
          </PrimaryButton>
        </CreatClassContainer>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const CreatClassContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  margin-left: 6rem;

  & > * {
    margin-bottom: 3.4rem;
  }
`;

export default CreateClass;
