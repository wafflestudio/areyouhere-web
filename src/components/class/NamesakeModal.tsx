import styled from "styled-components";

import exclamationMarkBlue from "../../assets/alert/exclamationMarkBlue.svg";
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
      <Container>
        <img src={exclamationMarkBlue} alt="alert" />
        <h4>Namesake alert</h4>
        <p>
          There are attendees with the same name : “이름" A random unique ID has
          been assigned next to the name. Please change the name on the Attendee
          page.
        </p>
      </Container>
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

  padding: 4rem;
  gap: 1rem;

  img {
    width: 3.3rem;
    height: 3.3rem;
  }

  h4 {
    ${({ theme }) => theme.typography.h4};
    color: ${({ theme }) => theme.colors.primary[500]};
  }

  p {
    ${({ theme }) => theme.typography.b3};
    text-align: center;
  }
`;

export default NamesakeModal;
