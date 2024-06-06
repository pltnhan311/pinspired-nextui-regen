import axiosClient from '~/api/axios-client';
import { IPost } from '~/types/types';

export const PostApi = {
  async getPostsByCategory(pageIndex: number, pageSize: number) {
    try {
      const { data } = await axiosClient.get<{ data: IPost[]; totalRecords: number }>(
        `post/get-posts-by-categories?pageIndex=${pageIndex}&pageSize=${pageSize}`
      );
      return data;
    } catch (error) {
      return { data: [], totalRecord: 0 };
    }
  },

  async getCreatedPostsByUser(userId: string) {
    try {
      const { data } = await axiosClient.get<{ data: IPost[]; totalRecords: number }>(
        `post/get-posts-by-user/${userId}`
      );
      return data;
    } catch (error) {
      return { data: [], totalRecord: 0 };
    }
  },

  async getSavedPostsByUser(userId: string) {
    try {
      const { data } = await axiosClient.post<{ data: IPost[]; totalRecords: number }>(`post/get-saved-posts/`, {
        id: userId
      });
      return data;
    } catch (error) {
      return { data: [], totalRecord: 0 };
    }
  },

  async getPostById(id: string) {
    try {
      const { data } = await axiosClient.get<{ data: IPost }>(`post/get-detail-post/${id}`);
      return data;
    } catch (error) {
      return { data: {} as IPost };
    }
  }
};
