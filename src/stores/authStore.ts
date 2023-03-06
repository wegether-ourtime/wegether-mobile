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
      set({loading: true});
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
      await AsyncStorage.setItem('userId', user.userId);
      set({user});

      return user;
    } catch (e) {
      console.log(e);
    } finally {
      set({loading: false});
    }
  },
  logout: async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userId');
    set({user: undefined});
  },
  register: async dto => {
    try {
      set({loading: true});
      const {data} = await axios.post(`${BASE_URL}/auth/register`, dto);

      return data;
    } catch (e) {
      throw e;
    } finally {
      set({loading: false});
    }
  },
  // setUser: (user: any) => set({user}),
  // setLoading: loading => set({loading}),
}));
