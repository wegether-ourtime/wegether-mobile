import Event from './Event';
import UserFriend from './UserFriend';

export default interface Chat {
  chatId: string;
  senderId: string;
  receiverId: string;
  userFriendId: string;
  eventId: string;
  text: string;
  userFriend: UserFriend;
  event: Event;

  createdAt: Date;
  updatedAt: Date;
}
