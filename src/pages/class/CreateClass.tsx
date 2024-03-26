import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { createCourse } from "../../api/course.ts";
import AddAttendeesChip from "../../components/attendees/AddAttendeesChip.tsx";
import { PrimaryButton } from "../../components/Button.tsx";
import { MultiLineTextField } from "../../components/TextField.tsx";
import TitleBar from "../../components/TitleBar.tsx";
import { AttendeeInfo } from "../../type.ts";

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

  // 이름 목록에 unknown name 허용 체크박스 (추후 사용 예정)
  const [isCheckedUnknownName, setIsCheckedUnknownName] = useState(false);

  return (
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
          onClick={() => {
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
              onlyListNameAllowed: isCheckedUnknownName,
            });
          }}
          disabled={className === ""}
        >
          Create a New Class
        </PrimaryButton>
      </CreatClassContainer>
    </Container>
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
