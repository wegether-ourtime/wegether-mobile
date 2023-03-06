import {create} from 'zustand';
import axios from 'axios';
import {BASE_URL} from '../config';
import User from '../models/User';
import {FileResource} from '../common/enums/fileResource';

interface FileState {
  //   files: User[];
  //   file: File | null;
  loading: boolean;
  uploadFile: (
    file: any,
    resource: FileResource,
    resourceId: string,
    id?: string,
  ) => any;
}

export const useFileStore = create<FileState>(set => ({
  loading: false,
  uploadFile: async (
    file: any,
    resource: FileResource,
    resourceId: string,
    id?: string,
  ) => {
    try {
      set({loading: true});
      const formData = new FormData();
      formData.append('file', {
        uri: file.assets[0].uri,
        name: file.assets[0].fileName,
        type: file.assets[0].type,
      });
      formData.append('resource', resource);
      formData.append('resourceId', resourceId);
      id && formData.append('id', id);
      const {data} = await axios.post(`${BASE_URL}/file/upload`, formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      });

      return data;
    } catch (err) {
      console.log(err);
    } finally {
      set({loading: false});
    }
  },
  //   createUser: async (createFriend: any) => {
  //     const {data} = await axios.post(`${BASE_URL}/user`, {
  //       ...createFriend,
  //     });
  //     const user = data;

  //     set({user});
  //   },
  //   updateUser: async (userId: string) => {
  //     const {data} = await axios.post(`${BASE_URL}/user`, {});
  //     const user = data;

  //     set({user});
  //   },
  //   deleteUser: async (userId: string) => {
  //     await axios.delete(`${BASE_URL}/user/${userId}`);
  //     set({});
  //   },
  // setLoading: (loading: boolean) => set({loading}),
}));
