import apiClient from './axios-instance';
import axios from 'axios';

type PaginatedFetch = { url: string; page: number; name?: string };

export const paginatedFetch = async <T>({ url, page = 1, name }: PaginatedFetch) => {
  try {
    const { data } = await apiClient.get<T>(url, { params: { page, name } });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        return { info: { next: null, prev: null, pages: 0, count: 0 }, results: [] };
      }
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
