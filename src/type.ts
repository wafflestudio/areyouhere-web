import React from "react";

export type ModalStateType = "open" | "closed" | "closing";

export type ModalStateHookType = [ModalStateType, () => void, () => void];

export type ModalProps = {
  children?: React.ReactNode;
  state: ModalStateType;
  onBackgroundClick: () => void;
};

export interface AttendeeInfo {
  id: number;
  name: string;
  note?: string;
  index?: number;
}

export type PickPartial<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>> &
  Partial<Pick<T, K>>;
