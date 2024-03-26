import { useMutation, useMutationState } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

import {
  AttendanceRequest,
  AttendanceResult,
  postAttend,
} from "../../api/attendance.ts";
import Check from "../../assets/check.svg?react";
import { ModalStateType } from "../../type.ts";
import { PrimaryButton } from "../Button.tsx";
import Modal from "../Modal.tsx";

function NoteSelectModal({
  onCancel,
  state,
  onError,
}: {
  onCancel: () => void;
  state: ModalStateType;
  onError?: (error: Error) => void;
}) {
  const navigate = useNavigate();
  const attendanceResults = useMutationState({
    filters: { mutationKey: ["attend"] },
    select: (mutation) => ({
      data: mutation.state.data as AttendanceResult,
      variables: mutation.state.variables as AttendanceRequest,
    }),
  });

  const { data, variables } = useMemo(() => {
    if (attendanceResults.length === 0) {
      return { data: null, variables: null };
    }
    const { data, variables } = attendanceResults[attendanceResults.length - 1];
    if (data == null || data.type !== "multipleChoices") {
      return { data: null, variables: null };
    }
    return {
      data: data.response.attendeeNotes.map((note) => ({
        id: note.id,
        name: variables.attendeeName,
        note: note.note,
      })),
      variables: variables,
    };
  }, [attendanceResults]);

  const [selectedProfile, setSelectedProfile] = useState(-1);

  const { mutate: performAttendance } = useMutation({
    mutationFn: postAttend,
    mutationKey: ["attend"],
    onSuccess: (data) => {
      if (data.type == "oneChoice") {
        navigate("/result");
      } else {
        console.error("Unexpected multipleChoices response");
      }
    },
    onError: (error) => {
      console.error(error);
      onError?.(error);
    },
  });

  if (data == null) {
    return null;
  }

  return (
    <Modal onBackgroundClick={onCancel} state={state}>
      <Container>
        <Title>Select your profile</Title>
        <CardContainer>
          {data.map((profile, index) => {
            return (
              <NoteCard
                key={index}
                selected={selectedProfile === index}
                onClick={() => {
                  setSelectedProfile(index);
                }}
              >
                <h5>{profile.name}</h5>
                <p>{profile.note}</p>
                <CheckIcon />
              </NoteCard>
            );
          })}
        </CardContainer>
        <ConfirmButton
          onClick={() => {
            if (selectedProfile === -1) {
              return;
            }
            performAttendance({
              attendeeName: data[selectedProfile].name,
              authCode: variables.authCode,
              attendeeId: data[selectedProfile].id,
            });
            onCancel();
          }}
        >
          Confirm
        </ConfirmButton>
      </Container>
    </Modal>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  max-width: calc(100vw - 6rem);
  padding: 4rem;
  gap: 3rem;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 3rem 2rem;
    width: 100%;
  }
`;

const Title = styled.h4`
  ${({ theme }) => theme.typography.h4};
  color: ${({ theme }) => theme.colors.primary["500"]};
  text-align: center;
  width: 100%;
`;

const CardContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  gap: 4rem;

  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`;

const NoteCard = styled.button<{ selected?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 16rem;
  height: 14rem;
  padding: 1rem;
  gap: 0.6rem;
  box-sizing: border-box;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.grey};
  box-shadow: ${({ theme }) => theme.effects.dropShadow};

  ${({ selected, theme }) =>
    selected &&
    css`
      border: 1px solid ${theme.colors.primary["500"]};
    `}

  ${({ selected, theme }) =>
    !selected &&
    css`
      &:hover {
        background-color: ${theme.colors.primary["50"]};
      }
    `};

  > h5 {
    ${({ theme }) => theme.typography.h5};
    color: ${({ theme, selected }) =>
      selected ? theme.colors.primary["500"] : theme.colors.black};
  }

  > p {
    ${({ theme }) => theme.typography.b1};
    color: ${({ theme }) => theme.colors.primary["500"]};
  }

  > svg {
    ${({ selected }) => `opacity: ${selected ? 1 : 0}`};
  }

  @media (max-width: 768px) {
    flex: 1;
    width: auto;

    background-color: ${({ theme, selected }) =>
      selected ? theme.colors.primary["50"] : theme.colors.white};
    border: 1px solid
      ${({ theme, selected }) =>
        selected ? theme.colors.primary["500"] : theme.colors.grey};

    > h5 {
      ${({ theme }) => theme.typography.h5};
      color: ${({ theme }) => theme.colors.black};
    }
  }
`;

const ConfirmButton = styled(PrimaryButton)`
  @media (max-width: 768px) {
    padding: 1.2rem 4rem;
    border-radius: 20rem;
    text-transform: uppercase;
  }
`;

const CheckIcon = styled(Check)`
  width: 3rem;
  height: 3rem;
  position: absolute;
  top: -1rem;
  right: -0.4rem;
  fill: ${({ theme }) => theme.colors.primary["500"]};
`;

export default NoteSelectModal;
