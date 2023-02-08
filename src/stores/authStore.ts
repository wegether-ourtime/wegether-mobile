import {create} from 'zustand';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../config';

export const useUserStore = create(set => ({
  user: undefined,
  loading: false,
  login: async (email: string, password: string) => {
    const {data} = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });

    const user = {
      email: data.user.email,
      token: data.jwt,
    };
    // await SecureStorage.setItem('user', JSON.stringify(user));
    await AsyncStorage.setItem('user', JSON.stringify(user));
    set({user});
  },
  logout: async () => {
    await AsyncStorage.removeItem('user');
    set({user: undefined});
  },
  register: async (email: string, password: string) => {
    await axios.post(`${BASE_URL}/auth/register`, {
      username: email,
      email,
      password,
    });
  },
  // setUser: (user: any) => set({user}),
  // setLoading: loading => set({loading}),
}));
