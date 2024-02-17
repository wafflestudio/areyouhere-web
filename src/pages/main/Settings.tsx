import React, { useState } from "react";
import styled from "styled-components";

import { PrimaryButton } from "../../components/Button.tsx";
import UnknownNameCheckbox from "../../components/class/UnknownNameCheckbox.tsx";
import { MultiLineTextField } from "../../components/TextField.tsx";
import TitleBar from "../../components/TitleBar.tsx";

function Settings() {
  const [className, setClassName] = useState("");
  const [description, setDescription] = useState("");

  // 이름 목록에 unknown name 허용 체크박스
  const [isCheckedUnknownName, setIsCheckedUnknownName] = useState(false);

  const handleUnknownNameCheckbox = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsCheckedUnknownName(e.target.checked);
  };

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
        <UnknownNameCheckbox
          checkboxId="unknownNameAllow"
          checked={isCheckedUnknownName}
          onChange={handleUnknownNameCheckbox}
        />
        <PrimaryButton style={{ width: "45rem" }} disabled={className === ""}>
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

  margin-left: 6rem;

  & > * {
    margin-bottom: 3.4rem;
  }
`;

export default Settings;
