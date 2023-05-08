import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  username: null,
  currentBalance: null,
  accessToken: null,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.username = action.payload.username;
      state.currentBalance = action.payload.currentBalance;
      state.accessToken = action.payload.accessToken;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
    updateBalance(state, action) {
      state.currentBalance = action.payload;
    }
  },
});

export const { login, logout, updateBalance } = sessionSlice.actions;

export default sessionSlice.reducer;
