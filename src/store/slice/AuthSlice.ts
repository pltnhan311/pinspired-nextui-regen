import { createSlice } from '@reduxjs/toolkit';

type LoadingState = 'idle' | 'loading' | 'succeeded' | 'failed';

export type AuthData = {
  AccessToken?: string;
  RefreshToken?: string;
  Email?: string;
};

export interface AuthState {
  loadingState: LoadingState;
  data: AuthData;
  isSignedIn: boolean;
  isLoaded: boolean;
}

const initialState: AuthState = {
  loadingState: 'idle',
  isSignedIn: false,
  isLoaded: false,
  data: {
    AccessToken: undefined,
    RefreshToken: undefined,
    Email: undefined
  }
};

const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loadingState = 'loading';
      state.isLoaded = false;
      state.isSignedIn = false;
      state.data = {};
    },
    loginSuccess: (state, action) => {
      console.log(action);
      state.loadingState = 'succeeded';
      state.isSignedIn = true;
      state.isLoaded = true;
      state.data = {
        AccessToken: action.payload.data.AccessToken,
        RefreshToken: action.payload.data.RefreshToken,
        Email: action.payload.data.Email
      };
    },
    loginFailed: (state) => {
      state.loadingState = 'failed';
      state.isSignedIn = false;
      state.isLoaded = true;
      state.data = {};
    },
    logoutStart: (state) => {
      state.loadingState = 'loading';
      state.isLoaded = false;
    },
    logoutSuccess: (state) => {
      state.loadingState = 'succeeded';
      state.isSignedIn = false;
      state.isLoaded = true;
      state.data = {};
    },
    logoutFailed: (state) => {
      state.loadingState = 'failed';
      state.isSignedIn = true;
      state.isLoaded = true;
      state.data = {
        AccessToken: undefined,
        RefreshToken: undefined,
        Email: undefined
      };
    },
    registerStart: (state) => {
      state.loadingState = 'loading';
    },
    registerSuccess: (state) => {
      state.loadingState = 'succeeded';
      state.isSignedIn = true;
      state.isLoaded = true;
    },
    registerFailed: (state) => {
      state.loadingState = 'failed';
      state.isSignedIn = false;
      state.isLoaded = false;
    },
    changePassStart: (state) => {
      state.loadingState = 'loading';
    },
    changePassSuccess: (state, action) => {
      state.loadingState = 'succeeded';
      state.data = action.payload ? action.payload.data : null;
    },
    changePassFailed: (state) => {
      state.loadingState = 'failed';
    }
  }
});

export const {
  loginStart,
  loginSuccess,
  loginFailed,
  registerStart,
  registerSuccess,
  registerFailed,
  logoutStart,
  logoutSuccess,
  logoutFailed,
  changePassStart,
  changePassSuccess,
  changePassFailed
} = AuthSlice.actions;

export default AuthSlice.reducer;
