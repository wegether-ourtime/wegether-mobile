export default interface UserEvent {
  userEventId: string;
  userId: string;
  eventId: string;
  isHost: boolean;
  createdAt: Date;
  updatedAt: Date;
}
