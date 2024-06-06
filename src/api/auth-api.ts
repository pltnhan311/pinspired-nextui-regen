import { FormData } from '~/schema';
import axiosClient from './axios-client';

export const AuthApi = {
  registerAccount(body: FormData) {
    return axiosClient.post('/user/register', body);
  },
  loginAccount(body: FormData) {
    return axiosClient.post('/user/login', body);
  },
  logoutAccount() {
    return axiosClient.get('/user/logout', {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWIwZWY0NzZiYzY5YWU4YjkxYThmNCIsImVtYWlsIjoiaW1wb3NzaWJsZUBnbWFpbC5jb20iLCJuYW1lIjoiaW1wb3NzaWJsZSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzE3MjQzNjU2LCJleHAiOjE3MTc4NDg0NTZ9.4EdfLcG7Yh5f2KnZe4XJjlaRaZqwZRTw-CnduZdGx_Q'
      }
    });
  },
  forgotPassword(body: { email: string; newPassword: string }) {
    return axiosClient.post('/user/forgot-password', body);
  }
};
