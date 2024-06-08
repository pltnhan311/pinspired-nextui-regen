import axiosClient from '~/api/axios-client';

export const FileApi = {
  async uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await axiosClient.post('/file/upload', formData);
    return data;
  }
};
