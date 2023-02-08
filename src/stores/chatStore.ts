import {create} from 'zustand';
import axios from 'axios';
import {BASE_URL} from '../config';

export const useChatStore = create(set => ({
  chats: [],
  chat: null,
  loading: false,
  getChats: async (criteria: any) => {
    const {data} = await axios.get(`${BASE_URL}/chat`, {...criteria});
    const chats = data;

    set({chats});
  },
  getChat: async (chatId: string) => {
    const {data} = await axios.get(`${BASE_URL}/chat/${chatId}`);
    const chat = data;

    set({chat});
  },
  createChat: async (createChat: any) => {
    const {data} = await axios.post(`${BASE_URL}/chat`, {
      ...createChat,
    });
    const chat = data;

    set({chat});
  },
  updateChat: async (chatId: string) => {
    const {data} = await axios.post(`${BASE_URL}/chat`, {});
    const chat = data;

    set({chat});
  },
  deleteChat: async (chatId: string) => {
    await axios.delete(`${BASE_URL}/chat/${chatId}`);
    set({});
  },
  setChat: (chat: any) => set({chat}),
  //   setLoading: loading => set({loading}),
}));
