import {create} from 'zustand';
import axios from 'axios';
import {BASE_URL} from '../config';
import Category from '../models/Category';

interface CategoryState {
  categories: Category[];
  category: Category | null;
  loading: boolean;
  getCategories: (criteria: any) => void;
  getCategory: (categoryId: string) => void;
  createCategory: (createCategory: string) => void;
  updateCategory: (categoryId: string) => void;
  deleteCategory: (categoryId: string) => void;
}

export const useCategoryStore = create<CategoryState>(set => ({
  categories: [],
  category: null,
  loading: false,
  getCategories: async (criteria: any) => {
    const {data} = await axios.get(`${BASE_URL}/category`, {...criteria});
    const categories = data;

    set({categories});
  },
  getCategory: async (categoryId: string) => {
    const {data} = await axios.get(`${BASE_URL}/category/${categoryId}`);
    const category = data;

    set({category});
  },
  createCategory: async (createCategory: any) => {
    const {data} = await axios.post(`${BASE_URL}/category`, {
      ...createCategory,
    });
    const category = data;

    set({category});
  },
  updateCategory: async (categoryId: string) => {
    const {data} = await axios.post(`${BASE_URL}/category`, {});
    const category = data;

    set({category});
  },
  deleteCategory: async (categoryId: string) => {
    await axios.delete(`${BASE_URL}/category/${categoryId}`);
    set({});
  },
  setCategory: (category: any) => set({category}),
  //   setLoading: loading => set({loading}),
}));
