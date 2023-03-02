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
  createUserEvent: (createUserEvent: any) => void;
  updateUserEvent: (userEventId: string) => void;
  deleteUserEvent: (userEventId: any) => void;
}

export const useUserEventStore = create<UserEventState>(set => ({
  userEvents: [],
  userEvent: null,
  loading: false,
  getUserEvents: async (criteria: any) => {
    const {data} = await axios.get(`${BASE_URL}/user-event`, {...criteria});
    const userEvents = data;

    set({userEvents});
  },
  getUserEvent: async (userEventId: string) => {
    const {data} = await axios.get(`${BASE_URL}/user-event/${userEventId}`);
    const userEvent = data;

    set({userEvent});
  },
  createUserEvent: async (createUserEvent: any) => {
    const {data} = await axios.post(`${BASE_URL}/user-event`, {
      ...createUserEvent,
    });
    const userEvent = data;

    set({userEvent});
  },
  updateUserEvent: async (userEventId: string) => {
    const {data} = await axios.post(`${BASE_URL}/user-event`, {});
    const userEvent = data;

    set({userEvent});
  },
  deleteUserEvent: async (userEventId: string) => {
    await axios.delete(`${BASE_URL}/user-event/${userEventId}`);
    set({});
  },
  setEvent: (userEvent: any) => set({userEvent}),
  //   setLoading: loading => set({loading}),
}));
