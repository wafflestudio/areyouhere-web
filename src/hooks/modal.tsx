import { useState } from "react";

import { ModalStateHookType, ModalStateType } from "../type";

function useModalState(): ModalStateHookType {
  const [state, setState] = useState<ModalStateType>("closed");

  const open = () => {
    setState("open");
  };
  const close = () => {
    setState("closing");
    setTimeout(() => setState("closed"), 300);
  };

  return [state, open, close];
}

export default useModalState;
