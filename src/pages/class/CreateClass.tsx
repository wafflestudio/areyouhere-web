import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { createCourse } from "../../api/course.ts";
import { PrimaryButton } from "../../components/Button.tsx";
import ChipBox from "../../components/class/ChipBox.tsx";
import NamesakeModal from "../../components/class/NamesakeModal.tsx";
import UnknownNameCheckbox from "../../components/class/UnknownNameCheckbox.tsx";
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

  // 이름 목록에 unknown name 허용 체크박스
  const [isCheckedUnknownName, setIsCheckedUnknownName] = useState(false);

  const handleUnknownNameCheckbox = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsCheckedUnknownName(e.target.checked);
  };

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
      onlyListNameAllowed: isCheckedUnknownName,
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
            onlyListNameAllowed: isCheckedUnknownName,
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
