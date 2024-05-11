import { useState } from "react";
import styled from "styled-components";

import { ModalStateType } from "../../type";
import { GreyButton, PrimaryButton } from "../Button";
import Modal from "../Modal";
import TextField from "../TextField";

interface CreateSessionModalProps {
  state: ModalStateType;
  onClose: () => void;
  onSubmit?: (sessionName: string) => void;
}

function CreateSessionModal({
  state,
  onClose,
  onSubmit,
}: CreateSessionModalProps) {
  const [sessionName, setSessionName] = useState("");

  return (
    <Modal state={state} onBackgroundClick={onClose}>
      <Container>
        <Title>Create a New Session</Title>
        <TextField
          label="Session Name"
          style={{ marginTop: "4rem", width: "100%" }}
          value={sessionName}
          onChange={(e) => setSessionName(e.target.value)}
        />
        <ButtonContainer>
          <GreyButton onClick={onClose}>Cancel</GreyButton>
          <PrimaryButton
            onClick={() => {
              onSubmit?.(sessionName);
            }}
            disabled={sessionName === ""}
          >
            Create a New Session
          </PrimaryButton>
        </ButtonContainer>
      </Container>
    </Modal>
  );
}

const Container = styled.div`
  width: 60.4rem;
  padding: 6rem 8rem;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 2rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.p`
  width: 100%;
  ${({ theme }) => theme.typography.h4};
  color: ${({ theme }) => theme.colors.black};
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 7.4rem;
  gap: 1rem;
`;

export default CreateSessionModal;
