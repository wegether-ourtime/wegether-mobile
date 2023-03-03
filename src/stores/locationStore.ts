import {create} from 'zustand';
import axios from 'axios';
import {BASE_URL} from '../config';
import Location from '../models/Location';

interface LocationState {
  locations: Location[];
  location: Location | null;
  nextPage: string | null;
  criteria: any | null;
  loading: boolean;
  getLocation: (criteria: any) => void;
  setCriteria: (criteria: any) => void;
}

export const useLocationStore = create<LocationState>(set => ({
  locations: [],
  location: null,
  nextPage: null,
  criteria: null,
  loading: false,
  getLocation: async (criteria: any) => {
    set({loading: true});
    const {data} = await axios.get(`${BASE_URL}/location/search-place`, {
      params: {...criteria},
    });
    const locations = data.data;
    const nextPage = data.nextPage;

    set({locations, nextPage, loading: false});
  },
  setLocation: (location: any) => set({location}),
  setCriteria: (criteria: any) => {
    set({criteria});
  },
  setLoading: (loading: boolean) => set({loading}),
}));
