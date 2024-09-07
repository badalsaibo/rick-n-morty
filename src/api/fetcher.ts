import apiClient from './axios-instance';
import axios from 'axios';

export const paginatedFetch = async (url: string, page = 1) => {
  console.log(url, page, apiClient);
  try {
    const { data } = await apiClient.get(`${url}?page=${page}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('API request error:', error);
      throw new Error(`Failed to fetch data: ${error.message}`);
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
};
