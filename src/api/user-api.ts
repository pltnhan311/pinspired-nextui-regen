import axiosClient from '~/api/axios-client';

export const UserApi = {
  async getUserInformation(email: string) {
    const { data } = await axiosClient.post(`/user/user-by-email/`, {
      Email: email
    });
    return data;
  }
};
