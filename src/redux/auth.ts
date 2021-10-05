import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

interface UserLogged {
  logged: boolean;
}

const userLogged: UserLogged = { logged: false };

const authSlice = createSlice({
  name: 'auth',
  initialState: userLogged,
  reducers: {
    userAuthenticated: state => {
      state.logged = true;
    },

    userNotAuthenticated: state => {
      state.logged = false;
    },
  },
});

export const { userAuthenticated, userNotAuthenticated } = authSlice.actions;

export const getUserAuthentication = (state: RootState): boolean =>
  state.auth.logged;

export default authSlice.reducer;
