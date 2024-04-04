import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import {
  deleteSession,
  Session,
  updateSessions,
  useSessions,
} from "../../../api/session.ts";
import AlertModal from "../../../components/AlertModal.tsx";
import {
  PrimaryButton,
  SecondaryButton,
  TertiaryButton,
} from "../../../components/Button.tsx";
import Checkbox from "../../../components/Checkbox.tsx";
import SessionItem from "../../../components/sessions/SessionItem.tsx";
import {
  CheckboxHeadItem,
  Table,
  TableBody,
  TableHead,
  TableHeadItem,
} from "../../../components/table/Table.tsx";
import TableControl from "../../../components/table/TableControl.tsx";
import TitleBar from "../../../components/TitleBar.tsx";
import { useCheckbox } from "../../../hooks/checkbox.tsx";
import useModalState from "../../../hooks/modal.tsx";

function Sessions() {
  const location = useLocation();
  const classId = parseInt(location.pathname.split("/")[2], 10);

  // 쿼리 관련
  const { data: sessions } = useSessions(classId);

  const queryClient = useQueryClient();
  const { mutate: deleteSessions } = useMutation({
    mutationFn: deleteSession,
    mutationKey: ["deleteSession"],
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ["sessions", classId],
      });

      // 삭제된 세션들을 tempSessions에서도 삭제
      const newTempSessions = { ...tempSessions };
      variables.sessionIds.forEach((id) => {
        delete newTempSessions[id];
      });
      setTempSessions(newTempSessions);
    },
  });

  const { mutate: updateSessionsMutation } = useMutation({
    mutationFn: updateSessions,
    mutationKey: ["updateSessions"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["sessions", classId],
      });
      setEditing(false);
    },
  });

  // 체크박스 관련
  const {
    checkedState,
    setCheckedState,
    isAllChecked,
    handleCheckboxChange,
    handleMasterCheckboxChange,
    checkedCount,
  } = useCheckbox({
    items: sessions ?? [],
    keyFn: (item) => item.id,
  });

  // 삭제 관련
  const [deleteModalState, openDeleteModal, closeDeleteModal] = useModalState();
  const handleDelete = () => {
    deleteSessions({
      sessionIds: Object.keys(checkedState)
        .map((id) => parseInt(id, 10))
        .filter((id) => checkedState[id]),
    });
  };

  // 수정 관련
  const [editing, setEditing] = useState(false);
  const [tempSessions, setTempSessions] = useState<Record<number, Session>>({});
  const handleSave = () => {
    const changedSessions: { id: number; name: string }[] = [];
    const originalSessionMap: Record<number, Session> =
      sessions?.reduce(
        (acc, session) => ({
          ...acc,
          [session.id]: session,
        }),
        {}
      ) ?? {};

    for (const id in tempSessions) {
      if (originalSessionMap[id].name !== tempSessions[id].name) {
        changedSessions.push({
          id: parseInt(id, 10),
          name: tempSessions[id].name,
        });
      }
    }

    updateSessionsMutation({
      sessions: changedSessions,
    });
  };

  // 정렬 관련
  const [option, setOption] = useState<string>("latest");

  return (
    <>
      <Container>
        <TitleBar label="Sessions" />
        <Content>
          <TableControl
            style={{ marginTop: 0 }}
            options={[
              { label: "Earliest", value: "earliest" },
              { label: "Latest", value: "latest" },
            ]}
            value={option}
            onOptionChange={setOption}
            trailing={
              editing ? (
                <>
                  <SecondaryButton
                    colorScheme={"red"}
                    style={{ width: "9.5rem" }}
                    onClick={openDeleteModal}
                  >
                    Delete
                  </SecondaryButton>
                  <PrimaryButton
                    style={{ width: "9.5rem" }}
                    onClick={() => handleSave()}
                  >
                    Save
                  </PrimaryButton>
                </>
              ) : (
                <TertiaryButton
                  style={{ width: "9.5rem" }}
                  onClick={() => {
                    setTempSessions(
                      sessions?.reduce(
                        (acc, session) => ({
                          ...acc,
                          [session.id]: session,
                        }),
                        {}
                      ) ?? {}
                    );
                    setEditing(!editing);
                  }}
                >
                  Edit
                </TertiaryButton>
              )
            }
          />
          <Table>
            <TableHead>
              <tr>
                {editing && (
                  <CheckboxHeadItem>
                    <Checkbox
                      checkboxId="masterCheckbox"
                      checked={isAllChecked}
                      onChange={handleMasterCheckboxChange}
                    />
                  </CheckboxHeadItem>
                )}
                <TableHeadItem
                  style={{
                    width: "20rem",
                    border: "none",
                  }}
                >
                  Date
                </TableHeadItem>
                <TableHeadItem
                  style={{
                    border: "none",
                  }}
                >
                  Session Name
                </TableHeadItem>
                <TableHeadItem
                  style={{
                    width: "14rem",
                    border: "none",
                  }}
                >
                  Attendance
                </TableHeadItem>
                <TableHeadItem
                  style={{
                    width: "14rem",
                    border: "none",
                  }}
                >
                  Absence
                </TableHeadItem>
              </tr>
            </TableHead>
            <TableBody>
              {(editing ? Object.values(tempSessions) : sessions ?? [])
                .sort((a, b) => {
                  if (option === "earliest") {
                    return a.date.getTime() - b.date.getTime();
                  } else {
                    return b.date.getTime() - a.date.getTime();
                  }
                })
                .map((session) => (
                  <SessionItem
                    isChecked={checkedState[session.id]}
                    onCheckboxChange={() => handleCheckboxChange(session.id)}
                    onSessionChange={(session) => {
                      setTempSessions({
                        ...tempSessions,
                        [session.id]: session,
                      });
                    }}
                    editing={editing}
                    key={session.id}
                    to={
                      editing
                        ? undefined
                        : `/class/${classId}/sessions/${session.id}`
                    }
                    session={session}
                  />
                ))}
            </TableBody>
          </Table>
        </Content>
      </Container>
      <AlertModal
        state={deleteModalState}
        type="delete"
        title="Delete Session?"
        content={
          <p>
            Are you sure you want to delete
            <p style={{ fontWeight: "700" }}>{checkedCount} Sessions?</p>
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
  padding-bottom: 5rem;
`;

const Content = styled.div`
  width: 118.1rem;
  display: flex;
  flex-direction: column;
  margin-left: 6.2rem;
  margin-right: auto;
`;

const TopBar = styled.div`
  padding: 1rem 3rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary["50"]};

  border: 1px solid ${({ theme }) => theme.colors.grey};
  border-radius: 2rem;
`;

const TopBarLabel = styled.span`
  ${({ theme }) => theme.typography.b3};
  color: ${({ theme }) => theme.colors.darkGrey};
`;

export default Sessions;
