import { HttpStatusCode } from "axios";

import { CreateAttendeeRequest, DeleteAttendeeRequest } from "../api/attendee";

import {
  GetMapping,
  PostMapping,
  RequestConfig,
  RequestMapping,
} from "./base.ts";

@RequestMapping("/api/attendee")
export class AttendeeMock {
  static attendees = [
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

  @GetMapping()
  static getAttendees() {
    return [HttpStatusCode.Ok, { classAttendees: this.attendees }];
  }

  @PostMapping()
  static createAttendee(config: RequestConfig) {
    const data = JSON.parse(config.data) as CreateAttendeeRequest;
    data.newAttendees.forEach((attendee) => {
      this.attendees.push({
        id: this.attendees.length + 1,
        name: attendee.name,
        attendance: 0,
        absence: 0,
      });
    });
    return [HttpStatusCode.Ok];
  }

  @PostMapping("/delete")
  static deleteAttendee(config: RequestConfig) {
    const data = JSON.parse(config.data) as DeleteAttendeeRequest;
    data.attendeeIds.forEach((id) => {
      const index = this.attendees.findIndex((a) => a.id === id);
      if (index !== -1) {
        this.attendees.splice(index, 1);
      }
    });
    return [HttpStatusCode.Ok];
  }
}
