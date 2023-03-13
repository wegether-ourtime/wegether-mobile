import {create} from 'zustand';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../config';
import User, {initialUserForm, UserForm} from '../models/User';
import {Login, Register} from '../models/Auth';

interface UserState {
  user: User | null;
  registerForm: UserForm | null;
  loading: boolean;
  login: (payload: Login) => any;
  logout: () => void;
  register: (payload: any) => any;
  setRegisterForm: (form: any) => any;
  clearRegisterForm: () => void;
}

export const useAuthStore = create<UserState>(set => ({
  user: null,
  registerForm: null,
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
  register: async (payload: UserForm) => {
    try {
      set({loading: true});
      const {data} = await axios.post(`${BASE_URL}/auth/register`, payload);

      return data;
    } catch (e) {
      throw e;
    } finally {
      set({registerForm: initialUserForm, loading: false});
    }
  },
  setRegisterForm: (registerForm: any) => {
    set({registerForm});
  },
  clearRegisterForm: () => {
    set({registerForm: initialUserForm});
  },
  // setUser: (user: any) => set({user}),
  // setLoading: loading => set({loading}),
}));
