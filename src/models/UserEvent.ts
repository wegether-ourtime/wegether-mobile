import Event from './Event';
import User from './User';

export default interface UserEvent {
  userEventId: string;
  userId: string;
  eventId: string;
  isHost: boolean;
  createdAt: Date;
  updatedAt: Date;

  user: User;
  event: Event;
}
