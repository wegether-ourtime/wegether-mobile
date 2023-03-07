import {create} from 'zustand';
import axios from 'axios';
import {BASE_URL} from '../config';
import Chat from '../models/Chat';

interface ChatState {
  chats: Chat[];
  chat: Chat | null;
  userFriendChats: any[];
  eventChats: any[];
  loading: boolean;
  getChats: (criteria: any) => any;
  getChat: (chatId: string) => any;
  getUserFriendChats: (userId: string) => any;
  getEventChats: (userId: string) => any;
  createChat: (payload: any) => any;
  updateChat: (chatId: string, payload: any) => any;
  deleteChat: (chatId: string) => void;
}

export const useChatStore = create<ChatState>(set => ({
  chats: [],
  chat: null,
  userFriendChats: [],
  eventChats: [],
  loading: false,
  getChats: async (criteria: any) => {
    try {
      set({loading: true});
      const {data} = await axios.get(`${BASE_URL}/chat`, {...criteria});
      const chats = data;

      set({chats});
      return chats;
    } catch (err) {
      console.log(err);
    } finally {
      set({loading: false});
    }
  },
  getChat: async (chatId: string) => {
    try {
      set({loading: true});
      const {data} = await axios.get(`${BASE_URL}/chat/${chatId}`);
      const chat = data;

      set({chat});
      return chat;
    } catch (err) {
      console.log(err);
    } finally {
      set({loading: false});
    }
  },
  getUserFriendChats: async (userId: string) => {
    try {
      set({loading: true});
      const {data} = await axios.get(
        `${BASE_URL}/chat/get-user-friend-chat-list/${userId}`,
      );
      const userFriendChats = data;

      set({userFriendChats});
      return userFriendChats;
    } catch (err) {
      console.log(err);
    } finally {
      set({loading: false});
    }
  },
  getEventChats: async (userId: string) => {
    try {
      set({loading: true});
      const {data} = await axios.get(
        `${BASE_URL}/chat/get-event-chat-list/${userId}`,
      );
      const eventChats = data;

      set({eventChats});
      return eventChats;
    } catch (err) {
      console.log(err);
    } finally {
      set({loading: false});
    }
  },
  createChat: async (payload: any) => {
    const {data} = await axios.post(`${BASE_URL}/chat`, {
      ...payload,
    });
    const chat = data;

    set({chat});
  },
  updateChat: async (chatId: string, payload: any) => {
    const {data} = await axios.post(`${BASE_URL}/chat`, {...payload});
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
