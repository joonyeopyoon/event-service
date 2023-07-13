import { Subjects, Publisher, EventCreatedMessage } from "@shared";
import { natsWrapper } from "../../../nats-wrapper";

class EventPublisher extends Publisher<EventCreatedMessage> {
  subject: Subjects.EventCreated = Subjects.EventCreated;
}

interface attrs {
  id: number;
  content: string;
}

export const created = async (parentId: string | null, args: attrs) => {
  // Database Insert Logic
  await new EventPublisher(natsWrapper.client).publish(parentId, { ...args });
};
