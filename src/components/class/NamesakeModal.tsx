import styled from "styled-components";

import { ModalStateType } from "../../type.ts";
import Modal from "../Modal.tsx";

function NamesakeModal({
  close,
  state,
}: {
  close: () => void;
  state: ModalStateType;
}) {
  return (
    <Modal onBackgroundClick={close} state={state}>
      <Container>Namesake Alert</Container>
    </Modal>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 43rem;
  height: 31.2rem;
`;

export default NamesakeModal;
