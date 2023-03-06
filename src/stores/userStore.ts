import {create} from 'zustand';
import axios from 'axios';
import {BASE_URL} from '../config';
import User from '../models/User';

interface UserState {
  users: User[];
  user: User | null;
  loading: boolean;
  getUsers: (criteria: any) => any;
  getUser: (userId: string) => any;
  //   createUser: (createFriend: string) => void;
  //   updateUser: (userId: string) => void;
  //   deleteUser: (userId: string) => void;
  // setLoading: (loading: boolean) => void;
}

export const useUserStore = create<UserState>(set => ({
  users: [],
  user: null,
  loading: false,
  getUsers: async (criteria: any) => {
    set({loading: true});
    const {data} = await axios.get(`${BASE_URL}/user`, {...criteria});
    const users = data;

    set({users, loading: false});
  },
  getUser: async (userId: string) => {
    set({loading: true});
    const {data} = await axios.get(`${BASE_URL}/user/${userId}`);
    const user = data;

    set({user, loading: false});
  },
  //   createUser: async (createFriend: any) => {
  //     const {data} = await axios.post(`${BASE_URL}/user`, {
  //       ...createFriend,
  //     });
  //     const user = data;

  //     set({user});
  //   },
  //   updateUser: async (userId: string) => {
  //     const {data} = await axios.post(`${BASE_URL}/user`, {});
  //     const user = data;

  //     set({user});
  //   },
  //   deleteUser: async (userId: string) => {
  //     await axios.delete(`${BASE_URL}/user/${userId}`);
  //     set({});
  //   },
  setFriend: (user: any) => set({user}),
  // setLoading: (loading: boolean) => set({loading}),
}));
