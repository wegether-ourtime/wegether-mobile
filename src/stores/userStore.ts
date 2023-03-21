import {create} from 'zustand';
import axios from 'axios';
import {BASE_URL} from '../config';
import User, {initialUserProfileForm, UserProfileForm} from '../models/User';

interface UserState {
  users: User[];
  user: User | null;
  userProfileForm: UserProfileForm | null;
  loading: boolean;
  getUsers: (criteria: any) => any;
  getUser: (userId: string) => any;
  //   createUser: (createFriend: string) => void;
  updateUser: (userId: string, payload: any) => any;
  //   deleteUser: (userId: string) => void;
  setUserProfileForm: (form: any) => void;
  clearUserProfileForm: () => void;
  // setLoading: (loading: boolean) => void;
}

export const useUserStore = create<UserState>(set => ({
  users: [],
  user: null,
  userProfileForm: initialUserProfileForm,
  loading: false,
  getUsers: async (criteria: any) => {
    try {
      set({loading: true});
      const {data} = await axios.get(`${BASE_URL}/user`, {...criteria});
      const users = data;

      set({users});
      return users;
    } catch (err) {
      console.log(err);
    } finally {
      set({loading: false});
    }
  },
  getUser: async (userId: string) => {
    try {
      set({loading: true});
      const {data} = await axios.get(`${BASE_URL}/user/${userId}`);
      const user = data;

      set({user});
      return user;
    } catch (err) {
      console.log(err);
    } finally {
      set({loading: false});
    }
  },
  //   createUser: async (createFriend: any) => {
  //     const {data} = await axios.post(`${BASE_URL}/user`, {
  //       ...createFriend,
  //     });
  //     const user = data;

  //     set({user});
  //   },
  updateUser: async (userId: string, payload: any) => {
    try {
      set({loading: true});
      const {data} = await axios.patch(`${BASE_URL}/user/${userId}`, payload);
      const user = data;

      set({user});
      return user;
    } catch (err) {
      console.log(err);
    } finally {
      set({loading: false});
    }
  },
  //   deleteUser: async (userId: string) => {
  //     await axios.delete(`${BASE_URL}/user/${userId}`);
  //     set({});
  //   },
  setUserProfileForm: (form: any) => {
    set({userProfileForm: form});
  },
  clearUserProfileForm: () => {
    set({userProfileForm: initialUserProfileForm});
  },
  // setLoading: (loading: boolean) => set({loading}),
}));
