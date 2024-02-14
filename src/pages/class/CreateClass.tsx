import React, { useState } from "react";
import styled from "styled-components";

import UnknownNameCheckbox from "../../components/class/UnknownNameCheckbox.tsx";
import TextField from "../../components/TextField.tsx";
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
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
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

  return (
    <Container>
      <TitleBar label="Create a new class" />
      <TextFieldContainer>
        <TextField
          label="Name of your class"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          label="Attendee name"
          value={attendeeInput}
          placeholder="Copy and paste the list of the participant names here."
          onChange={(e) => setAttendeeInput(e.target.value)}
          onKeyDown={handleEnterDown}
          onPaste={handlePaste}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
        />
        <UnknownNameCheckbox />
      </TextFieldContainer>
      <div>
        {attendeeList.map((name, index) => (
          <Chip key={index} onClick={() => removeChip(index)}>
            {name}
          </Chip>
        ))}
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const TextFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  margin-left: 6rem;

  & > * {
    width: 43.5rem;
    margin-bottom: 3.4rem;
  }
`;

const Chip = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 5px 10px;
  margin: 4px;
  background-color: #e0e0e0;
  border-radius: 16px;
  cursor: pointer;
`;

export default CreateClass;
