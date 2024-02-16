import { ReactNode } from "react";
import styled from "styled-components";

const ModalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  // 모달 버튼 글꼴
  & p {
    font-size: 1.2rem;
    margin: 0;
  }

  // 모달 컴포넌트 css
  & > :not(.modal--background) {
    animation: modal-content 0.3s;
    max-width: 430px;
    width: 100%;

    // 모달 화면 중앙 위치
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;

    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: white;
    border-radius: 1rem;

    box-sizing: border-box;
  }

  &.closing :not(.modal--background) {
    animation: modal-content-closing 0.3s; // Modal 관련 setTimeOut 300ms로 설정하기
    opacity: 0;
  }

  & .modal--background {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: -1;
    animation: modal-bg 0.3s;
  }

  &.closing > .modal--background {
    animation: modal-bg-closing 0.3s;
    opacity: 0;
  }

  @keyframes modal-content-closing {
    from {
      opacity: 1;
    }
    to {
    }
  }

  @keyframes modal-bg {
    from {
      opacity: 0;
    }
    to {
    }
  }

  @keyframes modal-bg-closing {
    from {
      opacity: 1;
    }
    to {
    }
  }
`;

type Props = {
  children: ReactNode;
  onBackgroundClick: () => void;
  isClosing: boolean;
};

export default function Modal({
  children,
  onBackgroundClick,
  isClosing,
}: Props) {
  return (
    <ModalContainer className={isClosing ? " closing" : ""}>
      <div className="modal--background" onClick={() => onBackgroundClick()} />
      {children}
    </ModalContainer>
  );
}
