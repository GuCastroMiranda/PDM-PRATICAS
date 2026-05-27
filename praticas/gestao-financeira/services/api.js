import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.27.1.208:3000', // Host IP for Android Emulator/Physical Device
});

export default api;
