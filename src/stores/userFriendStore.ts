import {create} from 'zustand';
import axios from 'axios';
import {BASE_URL} from '../config';
import UserFriend from '../models/UserFriend';

interface UserFriendState {
  userFriends: UserFriend[];
  userFriend: UserFriend | null;
  loading: boolean;
  getUserFriends: (criteria: any) => any;
  getUserFriend: (userFriendId: string) => any;
  createUserFriend: (payload: any) => any;
  updateUserFriend: (userFriendId: string, payload: any) => any;
  deleteUserFriend: (userFriendId: any) => any;
  getFriendRequest: (userId: string) => any;
}

export const useUserFriendStore = create<UserFriendState>(set => ({
  userFriends: [],
  userFriend: null,
  loading: false,
  getUserFriends: async (criteria: any) => {
    try {
      set({loading: true});
      const {data} = await axios.get(`${BASE_URL}/user-friend`, {...criteria});
      const userFriends = data;

      set({userFriends});
      return userFriends;
    } catch (err) {
      console.log(err);
    } finally {
      set({loading: false});
    }
  },
  getUserFriend: async (userFriendId: string) => {
    try {
      set({loading: true});
      const {data} = await axios.get(`${BASE_URL}/user-friend/${userFriendId}`);
      const userFriend = data;

      set({userFriend});
      return userFriend;
    } catch (err) {
      console.log(err);
    } finally {
      set({loading: false});
    }
  },
  createUserFriend: async (payload: any) => {
    try {
      set({loading: true});
      const {data} = await axios.post(`${BASE_URL}/user-friend`, {
        ...payload,
      });
      const userFriend = data;

      set({userFriend});
      return userFriend;
    } catch (err) {
      console.log(err);
    } finally {
      set({loading: false});
    }
  },
  updateUserFriend: async (userFriendId: string, payload: any) => {
    try {
      set({loading: true});
      const {data} = await axios.patch(
        `${BASE_URL}/user-friend/${userFriendId}`,
        {...payload},
      );
      const userFriend = data;

      set({userFriend});
      return userFriend;
    } catch (err) {
      console.log(err);
    } finally {
      set({loading: false});
    }
  },
  deleteUserFriend: async (userFriendId: string) => {
    try {
      set({loading: true});
      await axios.delete(`${BASE_URL}/user-friend/${userFriendId}`);
      set({});
    } catch (err) {
      console.log(err);
    } finally {
      set({loading: false});
    }
  },
  getFriendRequest: async (userId: string) => {
    try {
      set({loading: true});
      const {data} = await axios.get(
        `${BASE_URL}/user-friend/get-friend-request/${userId}`,
      );
      const userFriends = data;

      set({userFriends});
      return userFriends;
    } catch (err) {
      console.log(err);
    } finally {
      set({loading: false});
    }
  },
  setFriend: (userFriend: any) => set({userFriend}),
  //   setLoading: loading => set({loading}),
}));
