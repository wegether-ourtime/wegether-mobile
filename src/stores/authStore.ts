import {create} from 'zustand';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../config';
import User from '../models/User';
import {Login, Register} from '../models/Auth';

interface UserState {
  user: User | null;
  loading: boolean;
  login: (dto: Login) => any;
  logout: () => void;
  register: (dto: Register) => void;
}

export const useAuthStore = create<UserState>(set => ({
  user: null,
  loading: false,
  login: async ({email, password}) => {
    try {
      const {data} = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });

      const user = {
        ...data.user,
        token: data.accessToken,
      };

      // await SecureStorage.setItem('user', JSON.stringify(user));
      // await AsyncStorage.setItem('user', JSON.stringify(user));
      await AsyncStorage.setItem('token', user.token);
      set({user});
    } catch (e) {
      console.log(e);
    }
    return 'can use';
  },
  logout: async () => {
    await AsyncStorage.removeItem('user');
    set({user: undefined});
  },
  register: async dto => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/register`, dto);
    } catch (e) {
      throw e;
    }
  },
  // setUser: (user: any) => set({user}),
  // setLoading: loading => set({loading}),
}));
