import {create} from 'zustand';
import axios from 'axios';
import {BASE_URL} from '../config';
import Event, {EventForm, initialForm} from '../models/Event';

interface EventState {
  events: Event[];
  event: Event | null;
  form: EventForm | null;
  criteria: any | null;
  loading: boolean;
  getEvents: (criteria: any) => void;
  getEvent: (eventId: string) => void;
  createEvent: (createEvent: any) => void;
  updateEvent: (eventId: string) => void;
  deleteEvent: (eventId: string) => void;
  setForm: (form: any) => void;
  setCriteria: (criteria: any) => void;
}

export const useEventStore = create<EventState>(set => ({
  events: [],
  event: null,
  form: initialForm,
  criteria: null,
  loading: false,
  getEvents: async (criteria: any) => {
    set({loading: true});
    const {data} = await axios.get(`${BASE_URL}/event`, {
      params: {...criteria},
    });
    const events = data;

    set({events, loading: false});
  },
  getEvent: async (eventId: string) => {
    set({loading: true});
    const {data} = await axios.get(`${BASE_URL}/event/${eventId}`);
    const event = data;

    set({event, loading: false});
  },
  createEvent: async (createEvent: any) => {
    set({loading: true});
    const {data} = await axios.post(`${BASE_URL}/event`, {...createEvent});
    const event = data;

    set({event, loading: false});
  },
  updateEvent: async (eventId: string) => {
    set({loading: true});
    const {data} = await axios.post(`${BASE_URL}/event`, {});
    const event = data;

    set({event, loading: false});
  },
  deleteEvent: async (eventId: string) => {
    set({loading: true});
    await axios.delete(`${BASE_URL}/event/${eventId}`);

    set({loading: false});
  },
  setEvent: (event: any) => set({event}),
  setForm: (form: any) => set({form}),
  setCriteria: (criteria: any) => {
    set({criteria});
  },
  setLoading: (loading: boolean) => set({loading}),
}));
