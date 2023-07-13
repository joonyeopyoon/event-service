import {
  Listener,
  Subjects,
  CustomMessage,
  EventCreatedMessage,
} from "@shared";

export class Event_created extends Listener<EventCreatedMessage> {
  subject: Subjects.EventCreated = Subjects.EventCreated;
  async onMessage(
    data: EventCreatedMessage["data"],
    parentId: string | null,
    msg: CustomMessage
  ) {
    try {
      // Publisher Call Logic
      console.log(`parentId: ${parentId}, listener: ${JSON.stringify(data)}`);
      msg.ack();
    } catch (err) {
      msg.fail(err, 3);
    }
  }
}
