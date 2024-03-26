import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import { updateCourse, useCourses } from "../../api/course.ts";
import { PrimaryButton } from "../../components/Button.tsx";
import UnknownNameCheckbox from "../../components/class/UnknownNameCheckbox.tsx";
import { MultiLineTextField } from "../../components/TextField.tsx";
import TitleBar from "../../components/TitleBar.tsx";
import { useClassId } from "../../hooks/urlParse.tsx";

function Settings() {
  const [className, setClassName] = useState("");
  const [description, setDescription] = useState("");

  // 이름 목록에 unknown name 허용 체크박스
  const [onlyListNameAllowed, setOnlyListNameAllowed] = useState(false);

  const queryClient = useQueryClient();
  const { mutate: updateClass } = useMutation({
    mutationFn: updateCourse,
    mutationKey: ["updateCourse"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
  const { data: classList } = useCourses();

  const classId = useClassId();
  const classItem = useMemo(
    () => classList?.find((item) => item.id === classId),
    [classList, classId]
  );

  useEffect(() => {
    if (classItem) {
      setClassName(classItem.name);
      setDescription(classItem.description);
      setOnlyListNameAllowed(classItem.allowOnlyRegistered);
    }
  }, [classItem]);

  return (
    <Container>
      <TitleBar label="Class Settings" />
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
        <PrimaryButton
          style={{ width: "45rem" }}
          disabled={className === ""}
          onClick={() => {
            updateClass({
              id: classId,
              name: className,
              description,
              onlyListNameAllowed,
            });
          }}
        >
          Save Changes
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

  margin-left: 5rem;

  & > * {
    margin-bottom: 3.4rem;
  }
`;

export default Settings;
