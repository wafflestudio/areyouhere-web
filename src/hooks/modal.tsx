import { useState } from "react";

import { MODAL_ANIMATION_DURATION } from "../components/Modal.tsx";
import { ModalStateHookType, ModalStateType } from "../type";

function useModalState(): ModalStateHookType {
  const [state, setState] = useState<ModalStateType>("closed");

  const open = () => {
    setState("open");
  };
  const close = () => {
    setState("closing");
    setTimeout(() => setState("closed"), MODAL_ANIMATION_DURATION);
  };

  return [state, open, close];
}

export default useModalState;
