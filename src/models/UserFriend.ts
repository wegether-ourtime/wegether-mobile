import User from './User';

export default interface UserFriend {
  userFriendId: string;
  userId: string;
  friendId: string;
  status: string;
  user: User;
  friend: User;
  createdAt?: Date;
  updatedAt?: Date;
}
