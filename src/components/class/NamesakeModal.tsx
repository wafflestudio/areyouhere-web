import styled from "styled-components";

import Modal from "../Modal.tsx";

function NamesakeModal({
  close,
  isClosing,
}: {
  close: () => void;
  isClosing: boolean;
}) {
  return (
    <Modal onBackgroundClick={close} isClosing={isClosing}>
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
