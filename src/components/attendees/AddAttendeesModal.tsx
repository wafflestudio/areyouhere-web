import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { ModalStateType } from "../../type.ts";
import { GreyButton, PrimaryButton } from "../Button.tsx";
import ChipBox from "../class/ChipBox.tsx";
import Modal from "../Modal.tsx";
import { MultiLineTextField } from "../TextField.tsx";

function AddAttendeesModal({
  onCancel,
  state,
}: {
  onCancel: () => void;
  state: ModalStateType;
}) {
  // 이름 목록 chip으로 저장, 관리
  const [attendeeInput, setAttendeeInput] = useState("");
  const [attendeeList, setAttendeeList] = useState<string[]>([]);
  const [isComposing, setIsComposing] = useState(false); // 한글 입력 중인지 여부

  // 모달 열면 초기화
  useEffect(() => {
    if (state === "open") {
      setAttendeeList([]);
      setAttendeeInput("");
    }
  }, [state]);

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

  return (
    <Modal onBackgroundClick={onCancel} state={state}>
      <Container>
        <ContentContainer>
          <h4>Add New Attendees</h4>
          <MultiLineTextField
            textareaStyle={{ height: "7rem" }}
            value={attendeeInput}
            placeholder="Add attendee names using the 'enter' key or paste from a spreadsheet."
            onChange={(e) => setAttendeeInput(e.target.value)}
            onKeyDown={handleEnterDown}
            onPaste={handlePaste}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
          />
          <ChipBox
            attendeeList={attendeeList}
            removeChip={removeChip}
            chipContainerStyle={{ height: "14rem", overflowY: "scroll" }}
          />
        </ContentContainer>
        <ButtonContainer>
          <GreyButton onClick={onCancel}>Cancel</GreyButton>
          <PrimaryButton onClick={() => {}}>Add New Attendees</PrimaryButton>
        </ButtonContainer>
      </Container>
    </Modal>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 61rem;
  height: 45rem;
  padding: 2.5rem;

  background-color: white;
  border-radius: 1rem;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  width: 45rem;
  height: 45.8rem;
  gap: 2rem;

  h4 {
    ${({ theme }) => theme.typography.h4};
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

export default AddAttendeesModal;
