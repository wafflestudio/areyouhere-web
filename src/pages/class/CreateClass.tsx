import React, { useState } from "react";
import styled from "styled-components";

import { PrimaryButton } from "../../components/Button.tsx";
import ChipBox from "../../components/class/ChipBox.tsx";
import UnknownNameCheckbox from "../../components/class/UnknownNameCheckbox.tsx";
import { MultiLineTextField } from "../../components/TextField.tsx";
import TitleBar from "../../components/TitleBar.tsx";

function CreateClass() {
  const [className, setClassName] = useState("");
  const [description, setDescription] = useState("");

  // 이름 목록 chip으로 저장, 관리
  const [attendeeInput, setAttendeeInput] = useState("");
  const [attendeeList, setAttendeeList] = useState<string[]>([]);
  const [isComposing, setIsComposing] = useState(false); // 한글 입력 중인지 여부

  // 이름 넣고 엔터 치면 chip으로 저장
  const handleEnterDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isComposing) {
      e.preventDefault();
      addAttendee(attendeeInput);
    }
  };

  // 붙여넣은 목록을 chip으로 저장
  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const paste = e.clipboardData?.getData("text") || "";
    const pasteNames = paste
      .split(/\r?\n/)
      .filter((name: string) => name.trim() !== "");

    if (pasteNames.length > 0) {
      e.preventDefault();
      addAttendee(pasteNames.join("\n"));
    }
  };

  const addAttendee = (text: string) => {
    const newAttendee = text
      .split(/\r?\n/)
      .filter((name: string) => name.trim() !== "");
    setAttendeeList([...attendeeList, ...newAttendee]);
    setAttendeeInput("");
  };

  const removeChip = (index: number) => {
    setAttendeeList(attendeeList.filter((_, i) => i !== index));
  };

  // 이름 목록에 unknown name 허용 체크박스
  const [isCheckedUnknownName, setIsCheckedUnknownName] = useState(false);

  const handleUnknownNameCheckbox = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsCheckedUnknownName(e.target.checked);
  };

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
        <MultiLineTextField
          textareaStyle={{ height: "7rem" }}
          label="Attendee name"
          value={attendeeInput}
          placeholder="Add attendee names using the 'enter' key or paste from a spreadsheet."
          onChange={(e) => setAttendeeInput(e.target.value)}
          onKeyDown={handleEnterDown}
          onPaste={handlePaste}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
        />
        <UnknownNameCheckbox
          checkboxId="unknownNameAllow"
          checked={isCheckedUnknownName}
          onChange={handleUnknownNameCheckbox}
        />
        <ChipBox attendeeList={attendeeList} removeChip={removeChip} />
        <PrimaryButton style={{ width: "45rem" }}>
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
