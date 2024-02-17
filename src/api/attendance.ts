import axios from "axios";

export type AttendanceRequest = {
  attendeeName: string;
  authCode: string;
};

export const attend = async (request: AttendanceRequest): Promise<void> => {
  const res = await axios.post("/api/attendance", request);
  if (res.status !== 200) {
    throw new Error("Invalid passcode");
  }
};
