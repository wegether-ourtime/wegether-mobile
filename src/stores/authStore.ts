import {create} from 'zustand';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../config';
import User from '../models/User';
import {
  initialRegisterForm,
  Login,
  Register,
  RegisterForm,
} from '../models/Auth';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

interface UserState {
  user: User | null;
  registerForm: RegisterForm | null;
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
  register: async (payload: RegisterForm) => {
    try {
      set({loading: true});
      const {data} = await axios.post(`${BASE_URL}/auth/register`, payload);
      set({registerForm: initialRegisterForm});

      return data;
    } catch (e) {
      Toast.show({
        type: 'fail',
        text1: 'Error',
        text2: 'Desc',
      });

      throw e;
    } finally {
      set({loading: false});
    }
  },
  setRegisterForm: (registerForm: any) => {
    set({registerForm});
  },
  clearRegisterForm: () => {
    set({registerForm: initialRegisterForm});
  },
  // setUser: (user: any) => set({user}),
  // setLoading: loading => set({loading}),
}));
