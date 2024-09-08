import apiClient from './axios-instance';
import axios from 'axios';

export const paginatedFetch = async <T>(url: string, page = 1) => {
  try {
    const { data } = await apiClient.get<T>(`${url}?page=${page}`);
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

export const fetcher = async <T>(url: string) => {
  try {
    const { data } = await apiClient.get<T>(url);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('API request error:', error.message);
      throw new Error(`Failed to fetch data: ${error.message}`);
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
};
