import axiosClient from '~/api/axios-client';
import { FileApi } from '~/api/file-api';
import { IPost } from '~/types/types';

interface IPostBody {
  Title: string;
  Description: string;
  Attachment: { Id: string; Thumbnail: string };
  IsComment: boolean;
}

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
  },

  async createPost(file: File, postBody: IPostBody) {
    try {
      const upload = await FileApi.uploadFile(file);
      if (upload && postBody?.Attachment) {
        postBody.Attachment.Id = upload.data?.Attachment?.Id;
        postBody.Attachment.Thumbnail = upload?.data?.ThumbnailPath || '';
      }
      const { data } = await axiosClient.post<{ data: IPost }>(`post/create-post`, postBody);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error); //
    }
  }
};
