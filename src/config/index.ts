import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// export const BASE_URL = 'http://localhost:3000';
export const BASE_URL = 'https://wegether-backend-new-rxmlmib65q-as.a.run.app';

axios.interceptors.request.use(async (config: any) => {
  const token = await AsyncStorage.getItem('token');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
