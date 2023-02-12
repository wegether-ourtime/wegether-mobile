import {create} from 'zustand';
import axios from 'axios';
import {BASE_URL} from '../config';
import UserFriend from '../models/UserFriend';

interface UserFriendState {
  userFriends: UserFriend[];
  userFriend: UserFriend | null;
  loading: boolean;
  getUserFriends: (criteria: any) => void;
  getUserFriend: (userFriendId: string) => void;
  createUserFriend: (createFriend: string) => void;
  updateUserFriend: (userFriendId: string) => void;
  deleteUserFriend: (userFriendId: string) => void;
}

export const useUserFriendStore = create<UserFriendState>(set => ({
  userFriends: [],
  userFriend: null,
  loading: false,
  getUserFriends: async (criteria: any) => {
    const {data} = await axios.get(`${BASE_URL}/user-friend`, {...criteria});
    const userFriends = data;

    set({userFriends});
  },
  getUserFriend: async (userFriendId: string) => {
    const {data} = await axios.get(`${BASE_URL}/user-friend/${userFriendId}`);
    const userFriend = data;

    set({userFriend});
  },
  createUserFriend: async (createFriend: any) => {
    const {data} = await axios.post(`${BASE_URL}/user-friend`, {
      ...createFriend,
    });
    const userFriend = data;

    set({userFriend});
  },
  updateUserFriend: async (userFriendId: string) => {
    const {data} = await axios.post(`${BASE_URL}/user-friend`, {});
    const userFriend = data;

    set({userFriend});
  },
  deleteUserFriend: async (userFriendId: string) => {
    await axios.delete(`${BASE_URL}/user-friend/${userFriendId}`);
    set({});
  },
  setFriend: (userFriend: any) => set({userFriend}),
  //   setLoading: loading => set({loading}),
}));
