import {create} from 'zustand';
import axios from 'axios';
import {BASE_URL} from '../config';

export const useCategoryStore = create(set => ({
  categorys: [],
  category: null,
  loading: false,
  getCategorys: async (criteria: any) => {
    const {data} = await axios.get(`${BASE_URL}/category`, {...criteria});
    const categorys = data;

    set({categorys});
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
