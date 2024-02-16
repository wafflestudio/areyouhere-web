import styled from "styled-components";

import alertCircleBlue from "../assets/class/alertCircleBlue.svg";
import trashRed from "../assets/class/trashRed.svg";
import { ModalStateType } from "../type";

import { GreyButton, PrimaryButton } from "./Button";
import Modal from "./Modal";

interface AlertModalProps {
  state: ModalStateType;
  type: "info" | "delete";
  title: string;
  content: React.ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
}

function AlertModal({
  state,
  type,
  title,
  content,
  onCancel,
  onConfirm,
}: AlertModalProps) {
  const colorScheme = type === "info" ? "primary" : "red";
  return (
    <Modal onBackgroundClick={onCancel} state={state}>
      <Container>
        <img
          width={40}
          height={40}
          src={type === "info" ? alertCircleBlue : trashRed}
          alt="Alert"
        />
        <AlertModalTitle colorScheme={colorScheme}>{title}</AlertModalTitle>
        <AlertModalText>{content}</AlertModalText>
        <AlertModalButtonContainer>
          {type === "delete" && (
            <GreyButton style={{ flex: 1 }} onClick={onCancel}>
              Cancel
            </GreyButton>
          )}
          <PrimaryButton
            style={{ flex: 1 }}
            colorScheme={colorScheme}
            onClick={onConfirm}
          >
            {type === "info" ? "Confirm" : "Delete"}
          </PrimaryButton>
        </AlertModalButtonContainer>
      </Container>
    </Modal>
  );
}

const Container = styled.div`
  position: relative;
  width: 35.5rem;
  padding: 4rem;
  background-color: white;
  border-radius: 2rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AlertModalTitle = styled.h4<{ colorScheme: string }>`
  ${({ theme }) => theme.typography.h4};
  color: ${({ theme, colorScheme }) => theme.colors[colorScheme]["500"]};
  margin-top: 1rem;
`;

const AlertModalText = styled.p`
  ${({ theme }) => theme.typography.b3};
  text-align: center;

  margin-top: 1.5rem;
`;

const AlertModalButtonContainer = styled.div`
  width: 100%;
  margin-top: 3rem;

  display: flex;
  gap: 1rem;
`;

export default AlertModal;
