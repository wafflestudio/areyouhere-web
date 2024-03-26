import { Course } from "../api/course.ts";
import { AttendeeInfo } from "../type.ts";

export type SessionData = {
  id: number;
  name: string;
  startDate: Date;
  endDate?: Date;
  authCode?: string;
  attendances: {
    id: number;
    attendeeId: number;
    date: Date;
    attendanceStatus: boolean;
  }[];
};

export type UserData = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export type CourseData = Course & { attendees: AttendeeInfo[] } & {
  sessions: SessionData[];
};

export type DatabaseMockData = {
  courses: CourseData[];
  users: UserData[];
  nextAttendanceId: number;
  nextCourseId: number;
  nextSessionId: number;
  nextUserId: number;
  currentUser: number;
};

export class DatabaseMock {
  static courses: CourseData[] = [
    {
      id: 1,
      name: "Course 1",
      description: "Description for Course 1",
      allowOnlyRegistered: true,
      attendees: [
        {
          id: 1,
          name: "User1",
          note: "Note 1",
        },
        {
          id: 2,
          name: "User1",
          note: "Note 2",
        },
        {
          id: 3,
          name: "User 2",
        },
        {
          id: 4,
          name: "User 3",
        },
      ],
      sessions: [
        {
          id: 1,
          name: "Session 1",
          startDate: new Date(),
          authCode: "1234",
          attendances: [
            {
              id: 1,
              attendeeId: 1,
              date: new Date(),
              attendanceStatus: true,
            },
            {
              id: 2,
              attendeeId: 2,
              date: new Date(),
              attendanceStatus: true,
            },
            {
              id: 3,
              attendeeId: 3,
              date: new Date(),
              attendanceStatus: true,
            },
            {
              id: 4,
              attendeeId: 4,
              date: new Date(),
              attendanceStatus: false,
            },
          ],
        },
        {
          id: 2,
          name: "Session 2",
          startDate: new Date(),
          endDate: new Date(),
          attendances: [
            {
              id: 5,
              attendeeId: 1,
              date: new Date(),
              attendanceStatus: true,
            },
            {
              id: 6,
              attendeeId: 2,
              date: new Date(),
              attendanceStatus: true,
            },
            {
              id: 7,
              attendeeId: 3,
              date: new Date(),
              attendanceStatus: false,
            },
            {
              id: 8,
              attendeeId: 4,
              date: new Date(),
              attendanceStatus: false,
            },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "Course 2",
      description: "Description for Course 2",
      allowOnlyRegistered: false,
      attendees: [
        {
          id: 5,
          name: "User1",
          note: "Note 1",
        },
        {
          id: 6,
          name: "User1",
          note: "Note 2",
        },
        {
          id: 7,
          name: "User 2",
        },
      ],
      sessions: [],
    },
    {
      id: 3,
      name: "Course 3",
      description: "Description for Course 3",
      allowOnlyRegistered: true,
      attendees: [
        {
          id: 8,
          name: "User1",
          note: "Note 1",
        },
        {
          id: 9,
          name: "User1",
          note: "Note 2",
        },
        {
          id: 10,
          name: "User 2",
        },
      ],
      sessions: [],
    },
  ];

  static users = [
    {
      id: 1,
      name: "test1",
      email: "test1@test.com",
      password: "testtest",
    },
  ];

  static nextAttendanceId = 6;
  static nextCourseId = 4;
  static nextSessionId = 3;
  static nextUserId = 2;
  static nextAttendeeId = 11;
  static currentUser = -1;

  static update() {
    localStorage.setItem(
      "database",
      JSON.stringify({
        courses: this.courses,
        users: this.users,
        nextAttendanceId: this.nextAttendanceId,
        nextCourseId: this.nextCourseId,
        nextSessionId: this.nextSessionId,
        nextUserId: this.nextUserId,
        currentUser: this.currentUser,
      } as DatabaseMockData)
    );
  }

  static receiveUpdate() {
    const data = JSON.parse(
      localStorage.getItem("database")!
    ) as DatabaseMockData;
    console.log("Database updated", data);
    this.courses = data.courses;
    this.users = data.users;
    this.nextAttendanceId = data.nextAttendanceId;
    this.nextCourseId = data.nextCourseId;
    this.nextSessionId = data.nextSessionId;
    this.nextUserId = data.nextUserId;
    this.currentUser = data.currentUser;
  }
}

window.addEventListener("storage", (ev) => {
  if (ev.key === "database") {
    DatabaseMock.receiveUpdate();
  }
});

if (localStorage.getItem("database") != null) {
  DatabaseMock.receiveUpdate();
}
