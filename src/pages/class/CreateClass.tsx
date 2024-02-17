import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { createCourse } from "../../api/course.ts";
import crossBlack from "../../assets/class/crossBlack.svg";
import AlertModal from "../../components/AlertModal.tsx";
import { PrimaryButton } from "../../components/Button.tsx";
import UnknownNameCheckbox from "../../components/class/UnknownNameCheckbox.tsx";
import TextField from "../../components/TextField.tsx";
import TitleBar from "../../components/TitleBar.tsx";
import useModalState from "../../hooks/modal.tsx";

function CreateClass() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: createClass } = useMutation({
    mutationFn: createCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      navigate("/class");
    },
  });

  const [className, setClassName] = useState("");
  const [description, setDescription] = useState("");
  const [onlyListNameAllowed, setOnlyListNameAllowed] = useState(false);

  // 이름 목록 chip으로 저장, 관리
  const [attendeeInput, setAttendeeInput] = useState("");
  const [attendeeList, setAttendeeList] = useState<string[]>([]);
  const [isComposing, setIsComposing] = useState(false); // 한글 입력 중인지 여부

  const [attendeeListUndoHistory, setAttendeeListUndoHistory] = useState<
    string[][]
  >([[]]);

  const [attendeeListRedoHistory, setAttendeeListRedoHistory] = useState<
    string[][]
  >([]);

  // 이름 넣고 엔터 치면 chip으로 저장
  const handleEnterDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isComposing) {
      e.preventDefault();
      addAttendee(attendeeInput);
    } else if (e.key === "z" && e.ctrlKey && !e.shiftKey) {
      e.preventDefault();
      if (attendeeListUndoHistory.length > 1) {
        const newUndoHistory = [...attendeeListUndoHistory];
        newUndoHistory.pop();

        const newRedoHistory = [...attendeeListRedoHistory, [...attendeeList]];

        setAttendeeList(newUndoHistory[newUndoHistory.length - 1]);
        setAttendeeListUndoHistory(newUndoHistory.slice(-20));
        setAttendeeListRedoHistory(newRedoHistory.slice(-20));
      }
    } else if (
      (e.key === "y" && e.ctrlKey) ||
      (e.key === "z" && e.ctrlKey && e.shiftKey)
    ) {
      e.preventDefault();
      if (attendeeListRedoHistory.length > 0) {
        const newRedoHistory = [...attendeeListRedoHistory];
        newRedoHistory.pop();
        const newUndoHistory = [
          ...attendeeListUndoHistory,
          attendeeListRedoHistory[attendeeListRedoHistory.length - 1],
        ];

        setAttendeeList(
          attendeeListRedoHistory[attendeeListRedoHistory.length - 1]
        );
        setAttendeeListRedoHistory(newRedoHistory.slice(-20));
        setAttendeeListUndoHistory(newUndoHistory.slice(-20));
      }
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
    const newAttendeeList = [...attendeeList, ...newAttendee];
    setAttendeeList(newAttendeeList);
    setAttendeeListUndoHistory([...attendeeListUndoHistory, newAttendeeList]);
    setAttendeeListRedoHistory([]);
    setAttendeeInput("");
  };

  const removeChip = (index: number) => {
    const newAttendeeList = attendeeList.filter((_, i) => i !== index);
    setAttendeeList(newAttendeeList);
    setAttendeeListUndoHistory([...attendeeListUndoHistory, newAttendeeList]);
    setAttendeeListRedoHistory([]);
  };

  // 동명이인 관련 모달
  const [namesakeModal, openNamesakeModal, closeNamesakeModal] =
    useModalState();

  return (
    <Container>
      <TitleBar label="Create a New Class" />
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
          placeholder="Add attendee names using the 'enter' key or paste from a spreadsheet."
          onChange={(e) => setAttendeeInput(e.target.value)}
          onKeyDown={handleEnterDown}
          onPaste={handlePaste}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
        />
        <UnknownNameCheckbox
          checked={onlyListNameAllowed}
          onChange={(e) => setOnlyListNameAllowed(e.target.checked)}
        />
      </TextFieldContainer>
      <ChipContainer>
        <p>
          Attendee List<span>{` (${attendeeList.length})`}</span>
        </p>
        {attendeeList.map((name, index) => (
          <Chip key={index} onClick={() => removeChip(index)}>
            <p>{name}</p>
            <img src={crossBlack} alt="delete" />
          </Chip>
        ))}
      </ChipContainer>
      <PrimaryButton
        onClick={() => {
          if (attendeeList.length !== new Set(attendeeList).size) {
            openNamesakeModal();
            return;
          }
          createClass({
            name: className,
            description,
            attendees: attendeeList,
            onlyListNameAllowed: onlyListNameAllowed,
          });
        }}
      >
        Create a New Class
      </PrimaryButton>
      <AlertModal
        state={namesakeModal}
        type="info"
        title="Namesake Alert"
        content={<span>There are attendees with same name.</span>}
        onCancel={closeNamesakeModal}
        onConfirm={closeNamesakeModal}
      />
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
    width: 45rem;
    margin-bottom: 3.4rem;
  }
`;

const ChipContainer = styled.div`
  background-color: #eeeeee;
  width: 45rem;
  min-height: 14rem;
  height: auto;

  margin-left: 6rem;

  padding: 1rem;

  & p {
    font-size: 1.6rem;
    font-weight: 400;
    color: #4f4f4f;
    margin-bottom: 1.5rem;
  }
`;

const Chip = styled.span`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  height: 2.8rem;
  padding: 0.5rem 1.2rem;
  margin: 0 0.5rem 0.5rem 0;

  background-color: #ffffff;
  border: 0.1rem solid #000000;
  border-radius: 1.6rem;
  cursor: pointer;

  & p {
    ${({ theme }) => theme.typography.button1};
    color: #4f4f4f;

    height: fit-content;
    max-width: 39rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0;
  }

  & img {
    margin-left: 0.5rem;
    user-select: none;
  }

  &:hover {
    & p {
      color: #000000;
    }

    & img {
      filter: invert(1);
    }
  }
`;

export default CreateClass;
