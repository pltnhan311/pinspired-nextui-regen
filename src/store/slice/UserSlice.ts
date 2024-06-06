import { createSlice } from '@reduxjs/toolkit';
import { IUserData } from '~/types/types';

export interface UserState {
  data: Partial<IUserData>;
  isLoad: boolean;
}

const initialState: UserState = {
  data: {},
  isLoad: false
};

const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    fetchUserStart: (state) => {
      state.isLoad = false;
      state.data = {};
    },
    fetchUserSuccess: (state, action) => {
      state.isLoad = true;
      console.log(action);
      state.data = action.payload;
    },
    fetchUserFailed: (state) => {
      state.isLoad = false;
      state.data = {};
    }
  }
});

export const { fetchUserFailed, fetchUserStart, fetchUserSuccess } = UserSlice.actions;

export default UserSlice.reducer;
