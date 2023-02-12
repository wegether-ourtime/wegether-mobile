import {create} from 'zustand';
import axios from 'axios';
import {BASE_URL} from '../config';
import Category from '../models/Category';

interface UserCategoryState {
  userCategories: Category[];
  userCategory: Category | null;
  loading: boolean;
  getUserCategories: (criteria: any) => void;
  getUserCategory: (userCategoryId: string) => void;
  createUserCategories: (createCategory: string) => void;
}

export const useUserCategoryStore = create<UserCategoryState>(set => ({
  userCategories: [],
  userCategory: null,
  loading: false,
  getUserCategories: async (criteria: any) => {
    const {data} = await axios.get(`${BASE_URL}/user-category`, {...criteria});
    const userCategories = data;

    set({userCategories});
  },
  getUserCategory: async (userCategoryId: string) => {
    const {data} = await axios.get(
      `${BASE_URL}/user-category/${userCategoryId}`,
    );
    const userCategory = data;

    set({userCategory});
  },
  createUserCategories: async (createCategory: any) => {
    const {data} = await axios.post(`${BASE_URL}/user-category`, {
      ...createCategory,
    });
    const userCategory = data;

    set({userCategory});
  },
  setCategory: (userCategory: any) => set({userCategory}),
  //   setLoading: loading => set({loading}),
}));
