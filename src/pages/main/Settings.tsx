import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import { updateCourse, useCourses } from "../../api/course.ts";
import { PrimaryButton } from "../../components/Button.tsx";
import SnackBar from "../../components/SnackBar.tsx";
import {
  MultiLineTextField,
  SingleLineTextField,
} from "../../components/TextField.tsx";
import TitleBar from "../../components/TitleBar.tsx";
import useSnackbar from "../../hooks/snackbar.tsx";
import useSubmitHandler from "../../hooks/submitHandler.tsx";
import { useClassId } from "../../hooks/urlParse.tsx";

function Settings() {
  const { showSnackbar, show } = useSnackbar();

  const [className, setClassName] = useState("");
  const [description, setDescription] = useState("");

  // 이름 목록에 unknown name 허용 체크박스 (현재는 미사용)
  const [isOnlyListNameAllowed, setIsOnlyListNameAllowed] = useState(false);

  const queryClient = useQueryClient();
  const { mutate: updateClass } = useMutation({
    mutationFn: updateCourse,
    mutationKey: ["updateCourse"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      show();
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
      setIsOnlyListNameAllowed(classItem.allowOnlyRegistered);
    }
  }, [classItem]);

  const submit = () => {
    updateClass({
      id: classId,
      name: className,
      description,
      onlyListNameAllowed: isOnlyListNameAllowed,
    });
  };

  const { isSubmitting, handleSubmit } = useSubmitHandler();

  return (
    <Container>
      <TitleBar label="Class Settings" />
      <SettingContainer>
        <SingleLineTextField
          textFieldStyle={{ height: "4.5rem" }}
          label="Name of your class"
          value={className}
          placeholder="Enter the name of your class."
          maxLength={50}
          onChange={(e) => setClassName(e.target.value)}
        />
        <MultiLineTextField
          textFieldStyle={{ height: "12rem" }}
          label="Description"
          value={description}
          placeholder="Add a description."
          maxLength={250}
          onChange={(e) => setDescription(e.target.value)}
        />
        <PrimaryButton
          style={{ width: "45rem" }}
          disabled={
            className === "" ||
            (className === classItem?.name &&
              description === classItem?.description) ||
            isSubmitting
          }
          onClick={() => {
            handleSubmit(submit);
          }}
        >
          Save Changes
        </PrimaryButton>
      </SettingContainer>
      {showSnackbar && (
        <SnackBar isSuccess={true} message="All changes saved." />
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const SettingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  margin-left: 6rem;

  & > * {
    margin-bottom: 3.4rem;
  }
`;

export default Settings;
