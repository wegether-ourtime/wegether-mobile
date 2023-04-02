import {create} from 'zustand';
import axios from 'axios';
import {BASE_URL} from '../config';
import Event from '../models/Event';
import UserEvent from '../models/UserEvent';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserEventState {
  userEvents: UserEvent[];
  userEvent: UserEvent | null;
  loading: boolean;
  getUserEvents: (criteria: any) => void;
  getUserEvent: (userEventId: string) => void;
  createUserEvent: (payload: any) => any;
  updateUserEvent: (userEventId: string, payload: any) => any;
  deleteUserEvent: (userEventId: any) => any;
}

export const useUserEventStore = create<UserEventState>(set => ({
  userEvents: [],
  userEvent: null,
  loading: false,
  getUserEvents: async (criteria: any) => {
    try {
      set({loading: true});
      // const userId = (await AsyncStorage.getItem('userId')) ?? '';
      const {data} = await axios.get(`${BASE_URL}/user-event`, {
        params: {...criteria},
      });
      const userEvents = data;

      set({userEvents});
      return userEvents;
    } catch (err) {
      console.log(err);
    } finally {
      set({loading: false});
    }
  },
  getUserEvent: async (userEventId: string) => {
    try {
      set({loading: true});
      const {data} = await axios.get(`${BASE_URL}/user-event/${userEventId}`);
      const userEvent = data;

      set({userEvent});
      return userEvent;
    } catch (err) {
      console.log(err);
    } finally {
      set({loading: false});
    }
  },
  createUserEvent: async (payload: any) => {
    try {
      set({loading: true});
      const {data} = await axios.post(`${BASE_URL}/user-event`, {
        ...payload,
      });
      const userEvent = data;

      set({userEvent});
      return userEvent;
    } catch (err) {
      console.log(err);
    } finally {
      set({loading: false});
    }
  },
  updateUserEvent: async (userEventId: string, payload: any) => {
    try {
      set({loading: true});
      const {data} = await axios.patch(
        `${BASE_URL}/user-event/${userEventId}`,
        {
          ...payload,
        },
      );
      const userEvent = data;

      set({userEvent});
      return userEvent;
    } catch (err) {
      console.log(err);
    } finally {
      set({loading: false});
    }
  },
  deleteUserEvent: async (userEventId: string) => {
    try {
      set({loading: true});
      await axios.delete(`${BASE_URL}/user-event/${userEventId}`);
      set({});
    } catch (err) {
      console.log(err);
    } finally {
      set({loading: false});
    }
  },
  setEvent: (userEvent: any) => set({userEvent}),
  //   setLoading: loading => set({loading}),
}));
