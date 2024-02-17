import { useEffect } from "react";
import styled from "styled-components";

import { ModalProps } from "../type";

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

  // 모달 컴포넌트 css
  & > :not(.modal--background) {
    animation: modal-content 0.3s;

    // 모달 화면 중앙 위치
    position: fixed;
    margin: auto;

    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: white;
    border-radius: 1rem;

    box-sizing: border-box;
  }

  &.closing {
    pointer-events: none;
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

export default function Modal({
  children,
  onBackgroundClick,
  state,
}: ModalProps) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape" && state === "open") {
        onBackgroundClick();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onBackgroundClick, state]);

  return (
    <>
      {state !== "closed" && (
        <ModalContainer className={state != "open" ? " closing" : ""}>
          <div
            className="modal--background"
            onClick={() => onBackgroundClick()}
          />
          {children}
        </ModalContainer>
      )}
    </>
  );
}
