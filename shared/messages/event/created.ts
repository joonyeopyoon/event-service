import { Subjects } from "../subjects";

/* <Subjects>Message */
export interface EventCreatedMessage {
  subject: Subjects.EventCreated;
  data: {
    id: number;
    content: string;
  };
}
