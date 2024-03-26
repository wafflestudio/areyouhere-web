import React, { useState } from "react";

import ChipBox from "../class/ChipBox.tsx";
import { MultiLineTextField } from "../TextField.tsx";

function AddAttendeesChip({
  attendeeList,
  setAttendeeList,
}: {
  attendeeList: string[];
  setAttendeeList: (attendeeList: string[]) => void;
}) {
  const [attendeeInput, setAttendeeInput] = useState("");
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

  return (
    <>
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
      <ChipBox attendeeList={attendeeList} removeChip={removeChip} />
    </>
  );
}

export default AddAttendeesChip;
