import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import styled from "styled-components";

import {
  deleteAttendee,
  GetAttendeesResult,
  useAttendees,
} from "../../api/attendee.ts";
import AlertModal from "../../components/AlertModal.tsx";
import AddAttendeesModal from "../../components/attendees/AddAttendeesModal.tsx";
import AttendeesItem from "../../components/attendees/AttendeesItem.tsx";
import {
  PrimaryButton,
  SecondaryButton,
  TertiaryButton,
} from "../../components/Button.tsx";
import Checkbox from "../../components/Checkbox.tsx";
import {
  SessionTable,
  SessionTableHead,
  SessionTableHeadItem,
} from "../../components/sessions/SessionTable.tsx";
import TitleBar from "../../components/TitleBar.tsx";
import useModalState from "../../hooks/modal.tsx";
import { useClassId } from "../../hooks/urlParse.tsx";
import theme from "../../styles/Theme.tsx";
import { AttendeeInfo } from "../../type.ts";

import sessions from "./session/Sessions.tsx";

interface CheckedState {
  [key: number]: boolean;
}

function Attendees() {
  const classId = useClassId();
  const { data: attendees } = useAttendees(classId);

  const queryClient = useQueryClient();
  const { mutate: deleteAttendees } = useMutation({
    mutationFn: deleteAttendee,
    mutationKey: ["deleteAttendee"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attendees", classId] });
    },
  });

  // 체크 박스 관리
  const [checkedState, setCheckedState] = useState<CheckedState>({});
  const [isAllChecked, setIsAllChecked] = useState(false);

  const handleCheckboxChange = (id: number) => {
    setCheckedState((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleMasterCheckboxChange = () => {
    if (attendees == null) return;
    const newCheckedState = !isAllChecked;
    setIsAllChecked(newCheckedState);

    const newAttendeesCheckedState = attendees.reduce(
      (acc, attendee) => ({
        ...acc,
        [attendee.attendee.id]: newCheckedState,
      }),
      {}
    );

    setCheckedState(newAttendeesCheckedState);
  };

  const checkedCount = Object.values(checkedState).filter(Boolean).length;

  useEffect(() => {
    const allChecked =
      attendees != null &&
      attendees.length > 0 &&
      attendees.every((attendee) => checkedState[attendee.attendee.id]);
    setIsAllChecked(allChecked);
  }, [checkedState, attendees]);

  // 유저 추가 관련
  const [addModalState, openAddModal, closeAddModal] = useModalState();

  // 유저 삭제 관련
  const [deleteModalState, openDeleteModal, closeDeleteModal] = useModalState();

  const handleDelete = () => {
    if (attendees == null) return;
    const deleteAttendeeIds = attendees
      .filter((attendee) => checkedState[attendee.attendee.id])
      .map((attendee) => attendee.attendee.id);

    deleteAttendees({
      attendeeIds: deleteAttendeeIds,
    });

    // if editing, delete in tempAttendees
    if (tempAttendees != null) {
      setTempAttendees(
        tempAttendees.filter((attendee) => !checkedState[attendee.attendee.id])
      );
    }

    setIsAllChecked(false);
    setCheckedState({});
  };

  const handleSave = () => {
    if (tempAttendees != null) {
      // TODO: save tempAttendees
      // TODO: call api
    }
  };

  // 수정 관련
  const [editing, setEditing] = useState(false);
  const [tempAttendees, setTempAttendees] = useState<GetAttendeesResult | null>(
    null
  );

  return (
    <>
      <Container>
        <TitleBar label="Attendees">
          <PrimaryButton onClick={openAddModal}>
            Add New Attendees
          </PrimaryButton>
        </TitleBar>
        <HeaderContainer>
          <h5>{attendees?.length ?? 0} Attendees</h5>
          {editing ? (
            <ActionContainer>
              <SecondaryButton
                onClick={openDeleteModal}
                disabled={checkedCount === 0}
                colorScheme="red"
              >
                Delete
              </SecondaryButton>
              <PrimaryButton
                onClick={() => {
                  setTempAttendees(null);
                  setEditing(false);
                }}
              >
                Save
              </PrimaryButton>
            </ActionContainer>
          ) : (
            <TertiaryButton
              onClick={() => {
                if (attendees != null) {
                  setTempAttendees(attendees.slice());
                  setEditing(true);
                }
              }}
            >
              Edit
            </TertiaryButton>
          )}
        </HeaderContainer>
        <ContentContainer>
          <SessionTable>
            <SessionTableHead>
              <tr>
                {editing && (
                  <CheckboxCell>
                    <Checkbox
                      checkboxId="masterCheckbox"
                      checked={isAllChecked}
                      onChange={handleMasterCheckboxChange}
                    />
                  </CheckboxCell>
                )}
                <SessionTableHeadItem
                  style={{
                    width: "15rem",
                    border: "none",
                  }}
                >
                  Name
                </SessionTableHeadItem>
                <SessionTableHeadItem
                  style={{
                    width: "23.5rem",
                    border: "none",
                  }}
                >
                  Notes
                </SessionTableHeadItem>
                <SessionTableHeadItem
                  style={{
                    width: "14rem",
                    border: "none",
                  }}
                >
                  Attendance
                </SessionTableHeadItem>
                <SessionTableHeadItem
                  style={{
                    width: "auto",
                    border: "none",
                  }}
                >
                  Absence
                </SessionTableHeadItem>
              </tr>
            </SessionTableHead>
            {(editing ? tempAttendees : attendees)?.map((attendee, index) => (
              <AttendeesItem
                editing={editing}
                key={attendee.attendee.id}
                attendee={attendee.attendee}
                attendance={attendee.attendance}
                absence={attendee.absence}
                isChecked={checkedState[attendee.attendee.id]}
                onCheckboxChange={() =>
                  handleCheckboxChange(attendee.attendee.id)
                }
                onAttendeeChange={(newAttendee: AttendeeInfo) => {
                  if (tempAttendees != null) {
                    tempAttendees?.splice(index, 1, {
                      ...tempAttendees[index],
                      attendee: newAttendee,
                    });
                    setTempAttendees([...tempAttendees]);
                  }
                }}
              />
            ))}
          </SessionTable>
        </ContentContainer>
      </Container>
      {/* 모달 */}
      <AddAttendeesModal state={addModalState} onCancel={closeAddModal} />
      <AlertModal
        state={deleteModalState}
        type="delete"
        title="Delete Attendees?"
        content={
          <p>
            Are you sure you want to delete
            <p style={{ fontWeight: "700" }}>{checkedCount} Attendees?</p>
            You can't undo this action.
          </p>
        }
        onCancel={() => {
          closeDeleteModal();
        }}
        onConfirm={() => {
          handleDelete();
          closeDeleteModal();
        }}
      />
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const HeaderContainer = styled.div`
  width: 118.1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-left: 6.2rem;
  margin-right: auto;
  margin-bottom: 2.4rem;

  h5 {
    ${theme.typography.h5};
  }
`;

const ActionContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.2rem;
`;

const ContentContainer = styled.div`
  width: 118.1rem;
  display: flex;
  flex-direction: column;
  margin-left: 6.2rem;
  margin-right: auto;
`;

const CheckboxCell = styled.th`
  width: 2rem;
  text-align: center;
  vertical-align: middle;
  padding: 1.5rem 2.5rem 1.5rem 3rem;
`;

export default Attendees;
