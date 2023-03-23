import {create} from 'zustand';
import axios from 'axios';
import {BASE_URL} from '../config';
import Event from '../models/Event';

interface UserEventState {
  userEvents: Event[];
  userEvent: Event | null;
  loading: boolean;
  getUserEvents: (criteria: any) => void;
  getUserEvent: (userEventId: string) => void;
  createUserEvent: (createUserEvent: any) => any;
  // updateUserEvent: (userEventId: string) => any;
  deleteUserEvent: (userEventId: any) => any;
}

export const useUserEventStore = create<UserEventState>(set => ({
  userEvents: [],
  userEvent: null,
  loading: false,
  getUserEvents: async (criteria: any) => {
    try {
      set({loading: true});
      const {data} = await axios.get(`${BASE_URL}/user-event`, {...criteria});
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
  createUserEvent: async (createUserEvent: any) => {
    try {
      set({loading: true});
      const {data} = await axios.post(`${BASE_URL}/user-event`, {
        ...createUserEvent,
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
  // updateUserEvent: async (userEventId: string) => {
  //   const {data} = await axios.post(`${BASE_URL}/user-event`, {});
  //   const userEvent = data;

  //   set({userEvent});
  // },
  deleteUserEvent: async (userEventId: string) => {
    await axios.delete(`${BASE_URL}/user-event/${userEventId}`);
    set({});
  },
  setEvent: (userEvent: any) => set({userEvent}),
  //   setLoading: loading => set({loading}),
}));
