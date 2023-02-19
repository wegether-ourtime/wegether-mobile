import {create} from 'zustand';
import axios from 'axios';
import {BASE_URL} from '../config';
import Event from '../models/Event';

interface EventState {
  events: Event[];
  event: Event | null;
  criteria: any | null;
  loading: boolean;
  getEvents: (criteria: any) => void;
  getEvent: (eventId: string) => void;
  createEvent: (createEvent: string) => void;
  updateEvent: (eventId: string) => void;
  deleteEvent: (eventId: string) => void;
  setCriteria: (criteria: any) => void;
}

export const useEventStore = create<EventState>(set => ({
  events: [],
  event: null,
  criteria: null,
  loading: false,
  getEvents: async (criteria: any) => {
    const {data} = await axios.get(`${BASE_URL}/event`, {
      params: {...criteria},
    });
    const events = data;

    set({events});
  },
  getEvent: async (eventId: string) => {
    const {data} = await axios.get(`${BASE_URL}/event/${eventId}`);
    const event = data;

    set({event});
  },
  createEvent: async (createEvent: any) => {
    const {data} = await axios.post(`${BASE_URL}/event`, {...createEvent});
    const event = data;

    set({event});
  },
  updateEvent: async (eventId: string) => {
    const {data} = await axios.post(`${BASE_URL}/event`, {});
    const event = data;

    set({event});
  },
  deleteEvent: async (eventId: string) => {
    await axios.delete(`${BASE_URL}/event/${eventId}`);
    set({});
  },
  setEvent: (event: any) => set({event}),
  setCriteria: (criteria: any) => {
    set({criteria});
  },
  //   setLoading: loading => set({loading}),
}));
