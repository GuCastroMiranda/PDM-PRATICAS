import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Use 'localhost' para emuladores ou 'SEU_IP_LOCAL' para dispositivos físicos
});

export default api;
