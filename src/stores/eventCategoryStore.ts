import {create} from 'zustand';
import axios from 'axios';
import {BASE_URL} from '../config';
import Category from '../models/Category';

interface EventCategoryState {
  eventCategories: Category[];
  eventCategory: Category | null;
  loading: boolean;
  getEventCategories: (criteria: any) => void;
  getEventCategory: (eventCategoryId: string) => void;
  createEventCategory: (createCategory: string) => void;
  updateEventCategory: (eventCategoryId: string) => void;
  deleteEventCategory: (eventCategoryId: string) => void;
}

export const useCategoryStore = create<EventCategoryState>(set => ({
  eventCategories: [],
  eventCategory: null,
  loading: false,
  getEventCategories: async (criteria: any) => {
    const {data} = await axios.get(`${BASE_URL}/event-category`, {...criteria});
    const eventCategories = data;

    set({eventCategories});
  },
  getEventCategory: async (eventCategoryId: string) => {
    const {data} = await axios.get(
      `${BASE_URL}/event-category/${eventCategoryId}`,
    );
    const eventCategory = data;

    set({eventCategory});
  },
  createEventCategory: async (createCategory: any) => {
    const {data} = await axios.post(`${BASE_URL}/event-category`, {
      ...createCategory,
    });
    const eventCategory = data;

    set({eventCategory});
  },
  updateEventCategory: async (eventCategoryId: string) => {
    const {data} = await axios.post(`${BASE_URL}/event-category`, {});
    const eventCategory = data;

    set({eventCategory});
  },
  deleteEventCategory: async (eventCategoryId: string) => {
    await axios.delete(`${BASE_URL}/event-category/${eventCategoryId}`);
    set({});
  },
  setCategory: (eventCategory: any) => set({eventCategory}),
  //   setLoading: loading => set({loading}),
}));
