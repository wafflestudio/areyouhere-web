export type ModalStateType = "open" | "closed" | "closing";

export type ModalStateHookType = [ModalStateType, () => void, () => void];

export type ModalProps = {
  children?: React.ReactNode;
  state: ModalStateType;
  onBackgroundClick: () => void;
};

export interface Attendee {
  id: number;
  name: string;
  attendance: number;
  absence: number;
}
