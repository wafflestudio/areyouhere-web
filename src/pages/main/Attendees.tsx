import { useEffect, useState } from "react";
import styled from "styled-components";

import AlertModal from "../../components/AlertModal.tsx";
import AddAttendeesModal from "../../components/attendees/AddAttendeesModal.tsx";
import AttendeesItem from "../../components/attendees/AttendeesItem.tsx";
import { PrimaryButton, SecondaryButton } from "../../components/Button.tsx";
import Checkbox from "../../components/Checkbox.tsx";
import {
  SessionTable,
  SessionTableHead,
  SessionTableHeadItem,
} from "../../components/sessions/SessionTable.tsx";
import TitleBar from "../../components/TitleBar.tsx";
import useModalState from "../../hooks/modal.tsx";
import theme from "../../styles/Theme.tsx";
import attendeesData from "../../test/attendeesData.json";

interface CheckedState {
  [key: number]: boolean;
}

function Attendees() {
  // attendees data 관리
  const [attendees, setAttendees] = useState(attendeesData.data);

  useEffect(() => {
    // Todo: fetch data from server
  }, []);

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
    const newCheckedState = !isAllChecked;
    setIsAllChecked(newCheckedState);

    const newAttendeesCheckedState = attendees.reduce(
      (acc, attendee) => ({
        ...acc,
        [attendee.id]: newCheckedState,
      }),
      {}
    );

    setCheckedState(newAttendeesCheckedState);
  };

  const checkedCount = Object.values(checkedState).filter(Boolean).length;

  useEffect(() => {
    const allChecked =
      attendees.length > 0 &&
      attendees.every((attendee) => checkedState[attendee.id]);
    setIsAllChecked(allChecked);
  }, [checkedState, attendees]);

  // 유저 추가 관련
  const [addModalState, openAddModal, closeAddModal] = useModalState();

  // 유저 삭제 관련
  const [deleteModalState, openDeleteModal, closeDeleteModal] = useModalState();

  const handleDelete = () => {
    const remainingAttendees = attendees.filter(
      (attendee) => !checkedState[attendee.id]
    );

    setAttendees(remainingAttendees);

    setIsAllChecked(false);
    setCheckedState({});
  };

  return (
    <>
      <Container>
        <TitleBar label="Attendees">
          <PrimaryButton onClick={openAddModal}>
            Add New Attendees
          </PrimaryButton>
        </TitleBar>
        <HeaderContainer>
          <h5>{`${attendees.length} Attendees`}</h5>
          <SecondaryButton
            onClick={openDeleteModal}
            disabled={checkedCount === 0}
            colorScheme="red"
          >
            Delete
          </SecondaryButton>
        </HeaderContainer>
        <ContentContainer>
          <SessionTable>
            <SessionTableHead>
              <tr>
                <CheckboxCell>
                  <Checkbox
                    checkboxId="masterCheckbox"
                    checked={isAllChecked}
                    onChange={handleMasterCheckboxChange}
                  />
                </CheckboxCell>
                <SessionTableHeadItem
                  style={{
                    width: "20rem",
                    border: "none",
                  }}
                >
                  Name
                </SessionTableHeadItem>
                <SessionTableHeadItem
                  style={{
                    width: "20rem",
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
            {attendees.map((attendee) => (
              <AttendeesItem
                key={attendee.id}
                attendee={attendee}
                isChecked={!!checkedState[attendee.id]}
                onCheckboxChange={() => handleCheckboxChange(attendee.id)}
              />
            ))}
          </SessionTable>
        </ContentContainer>
      </Container>
      {/* 모달 */}
      <AddAttendeesModal
        state={addModalState}
        onCancel={closeAddModal}
      ></AddAttendeesModal>

      <AlertModal
        state={deleteModalState}
        type="delete"
        title="Delete Attendees?"
        content={
          <p>
            Are you sure you want to delete
            <p style={{ fontWeight: "700" }}>{`${checkedCount} Attendees?`}</p>
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

const ContentContainer = styled.div`
  width: 118.1rem;
  display: flex;
  flex-direction: column;
  margin-left: 6.2rem;
  margin-right: auto;
`;

const CheckboxCell = styled.th`
  width: 4rem;
  vertical-align: middle;
  padding: 1.5rem 2.5rem 1.5rem 3rem;
`;

export default Attendees;
