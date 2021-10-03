import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

const authSlice = createSlice({
  name: "auth",
  initialState: {
    logged: false,
  },
  reducers: {
    userAuthenticated: (state) => {
      state.logged = true;
    },

    userNotAuthenticated: (state) => {
      state.logged = false;
    },
  },
});

export const { userAuthenticated, userNotAuthenticated } = authSlice.actions;

export const getUserAuthentication = (state: RootState): boolean => state.auth.logged;

export default authSlice.reducer;
