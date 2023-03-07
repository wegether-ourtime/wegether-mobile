import {create} from 'zustand';
import axios from 'axios';
import {BASE_URL} from '../config';
import Event, {EventForm, initialEventForm} from '../models/Event';

interface EventState {
  events: Event[];
  event: Event | null;
  form: EventForm | null;
  criteria: any | null;
  loading: boolean;
  getEvents: (criteria: any) => any;
  getEvent: (eventId: string) => any;
  createEvent: (payload: any) => any;
  updateEvent: (eventId: string, payload: any) => any;
  deleteEvent: (eventId: string) => void;
  setForm: (form: any) => any;
  clearForm: () => void;
  setCriteria: (criteria: any) => void;
}

export const useEventStore = create<EventState>(set => ({
  events: [],
  event: null,
  form: initialEventForm,
  criteria: null,
  loading: false,
  getEvents: async (criteria: any) => {
    try {
      set({loading: true});
      const {data} = await axios.get(`${BASE_URL}/event`, {
        params: {...criteria},
      });
      const events = data;

      set({events});
      return events;
    } catch (err) {
      console.log(err);
    } finally {
      set({loading: false});
    }
  },
  getEvent: async (eventId: string) => {
    try {
      set({loading: true});
      const {data} = await axios.get(`${BASE_URL}/event/${eventId}`);
      const event = data;

      set({event});
      return event;
    } catch (err) {
      console.log(err);
    } finally {
      set({loading: false});
    }
  },
  createEvent: async (payload: EventForm) => {
    try {
      set({loading: true});
      const {data} = await axios.post(`${BASE_URL}/event`, {...payload});
      const event = data;

      set({event, form: initialEventForm});
      return event;
    } catch (err) {
      console.log(err);
    } finally {
      set({loading: false});
    }
  },
  updateEvent: async (eventId: string, payload: any) => {
    try {
      set({loading: true});
      console.log('payload: ', payload)
      const {data} = await axios.post(`${BASE_URL}/event/${eventId}`, {
        ...payload,
      });
      const event = data;

      set({event});
      return event;
    } catch (err) {
      console.log(err);
    } finally {
      set({loading: false});
    }
  },
  deleteEvent: async (eventId: string) => {
    try {
      set({loading: true});
      await axios.delete(`${BASE_URL}/event/${eventId}`);
    } catch (err) {
      console.log(err);
    } finally {
      set({loading: false});
    }
  },
  setEvent: (event: any) => set({event}),
  setForm: (form: any) => {
    set({form});
  },
  clearForm: () => set({form: initialEventForm}),
  setCriteria: (criteria: any) => {
    set({criteria});
  },
  setLoading: (loading: boolean) => set({loading}),
}));
