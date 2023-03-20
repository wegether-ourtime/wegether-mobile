import {create} from 'zustand';
import axios from 'axios';
import {BASE_URL} from '../config';
import Category from '../models/Category';

interface UserCategoryState {
  userCategories: Category[];
  userCategory: Category | null;
  loading: boolean;
  getUserCategories: (criteria: any) => any;
  getUserCategory: (userCategoryId: string) => any;
  updateUserCategories: (payload: string) => any;
}

export const useUserCategoryStore = create<UserCategoryState>(set => ({
  userCategories: [],
  userCategory: null,
  loading: false,
  getUserCategories: async (criteria: any) => {
    try {
      set({loading: true});
      const {data} = await axios.get(`${BASE_URL}/user-category`, {
        params: {...criteria},
      });
      const userCategories = data;

      set({userCategories});
      return userCategories;
    } catch (err) {
      console.log(err);
    } finally {
      set({loading: false});
    }
  },
  getUserCategory: async (userCategoryId: string) => {
    try {
      set({loading: true});
      const {data} = await axios.get(
        `${BASE_URL}/user-category/${userCategoryId}`,
      );
      const userCategory = data;

      set({userCategory});
      return userCategory;
    } catch (err) {
      console.log(err);
    } finally {
      set({loading: false});
    }
  },
  updateUserCategories: async (payload: any) => {
    try {
      set({loading: true});
      const {data} = await axios.post(`${BASE_URL}/user-category`, {
        ...payload,
      });
      const userCategory = data;

      set({userCategory});
      return userCategory;
    } catch (err) {
      console.log(err);
    } finally {
      set({loading: false});
    }
  },
  // setCategory: (userCategory: any) => set({userCategory}),
  // setLoading: loading => set({loading}),
}));
