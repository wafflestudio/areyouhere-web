import { HttpStatusCode } from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

import { CreateAttendeeRequest, DeleteAttendeeRequest } from "../api/attendee";

const attendees = [
  {
    id: 1,
    name: "User 1",
    attendance: 3,
    absence: 0,
  },
  {
    id: 2,
    name: "User 2",
    attendance: 1,
    absence: 1,
  },
  {
    id: 3,
    name: "User 3",
    attendance: 2,
    absence: 1,
  },
];

let id = 4;

function addAttendeeMock(mock: AxiosMockAdapter) {
  mock.onGet(/\/api\/attendee\/\d+/).reply(() => {
    console.log("attendees", attendees);
    return [
      HttpStatusCode.Ok,
      {
        classAttendees: attendees,
      },
    ];
  });

  mock.onPost("/api/attendee").reply((config) => {
    const data = JSON.parse(config.data) as CreateAttendeeRequest;
    data.newAttendees.forEach((attendee) => {
      attendees.push({
        id: id++,
        name: attendee.name,
        attendance: 0,
        absence: 0,
      });
    });
    return [HttpStatusCode.Ok];
  });

  mock.onDelete("/api/attendee").reply((config) => {
    const data = JSON.parse(config.data) as DeleteAttendeeRequest;
    data.attendeeIds.forEach((id) => {
      const index = attendees.findIndex((a) => a.id === id);
      if (index !== -1) {
        attendees.splice(index, 1);
      }
    });
    return [HttpStatusCode.Ok];
  });
}

export default addAttendeeMock;
