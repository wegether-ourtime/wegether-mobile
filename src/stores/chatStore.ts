import {create} from 'zustand';
import axios from 'axios';
import {BASE_URL} from '../config';
import Chat from '../models/Chat';
import {socket} from '../common/function/utility';

interface ChatState {
  chats: Chat[];
  chat: Chat | null;
  userFriendList: any[];
  eventList: any[];
  loading: boolean;
  getDirectChats: (userFriendId: string) => any;
  getEventChats: (eventId: string) => any;
  getUserFriendList: (userId: string) => any;
  getEventList: (userId: string) => any;
  createChat: (payload: any) => any;
  updateChat: (chatId: string, payload: any) => any;
  deleteChat: (chatId: string) => void;
  socket: () => {
    sendMessage: ({}) => void;
    receiveMessage: ({}) => void;
    disconnect: ({}) => void;
  };
}

export const useChatStore = create<ChatState>(set => ({
  chats: [],
  chat: null,
  userFriendList: [],
  eventList: [],
  loading: false,
  getDirectChats: async (userFriendId: any) => {
    try {
      set({loading: true});
      const {data} = await axios.get(`${BASE_URL}/chat/direct/${userFriendId}`);
      const chats = data;

      set({chats});
      return chats;
    } catch (err) {
      console.log(err);
    } finally {
      set({loading: false});
    }
  },
  getEventChats: async (eventId: string) => {
    try {
      set({loading: true});
      const {data} = await axios.get(`${BASE_URL}/chat/event/${eventId}`);
      const chats = data;

      set({chats});
      return chats;
    } catch (err) {
      console.log(err);
    } finally {
      set({loading: false});
    }
  },
  getUserFriendList: async (userId: string) => {
    try {
      set({loading: true});
      const {data} = await axios.get(
        `${BASE_URL}/chat/get-user-friend-chat-list/${userId}`,
      );
      const userFriendList = data;

      set({userFriendList});
      return userFriendList;
    } catch (err) {
      console.log(err);
    } finally {
      set({loading: false});
    }
  },
  getEventList: async (userId: string) => {
    try {
      set({loading: true});
      const {data} = await axios.get(
        `${BASE_URL}/chat/get-event-chat-list/${userId}`,
      );
      const eventList = data;

      set({eventList});
      return eventList;
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

  // socket
  socket: () => {
    const sendMessage = async ({
      userId,
      userFriendId,
      eventId,
      userFriend,
      message,
    }: any) => {
      socket.emit(`send-message`, {
        senderId: userId,
        ...(userFriendId
          ? {userFriendId, receiverId: userFriend?.friendId}
          : {}),
        ...(eventId ? {eventId} : {}),
        text: message,
      });
    };

    const receiveMessage = async ({userFriendId, eventId}: any) => {
      // const chats = useChatStore.getState().chats;
      if (userFriendId) {
        socket.on(`receive-direct-message-${userFriendId}`, (chat: Chat) => {
          // chats.push(chat);
          set({chats: []});
        });
      } else if (eventId) {
        socket.on(`receive-event-message-${eventId}`, (chat: Chat) => {
          // chats.push(chat);
          set({chats: []});
        });
      }
    };

    const disconnect = async ({userFriendId, eventId}: any) => {
      socket.removeListener(`receive-direct-message-${userFriendId}`);
      socket.removeListener(`receive-event-message-${eventId}`);
    };

    return {
      sendMessage,
      receiveMessage,
      disconnect,
    };
  },
}));
