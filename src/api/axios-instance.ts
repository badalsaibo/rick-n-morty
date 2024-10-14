import axios from 'axios';
import { API_URL } from '@env';

const apiClient = axios.create({
  baseURL: API_URL,
});

// apiClient.interceptors.request.use(request => {
//   console.log('Starting Request', JSON.stringify(request, null, 2));
//   return request;
// });

// apiClient.interceptors.response.use(response => {
//   console.log('Response:', JSON.stringify(response, null, 2));
//   return response;
// });

export default apiClient;
