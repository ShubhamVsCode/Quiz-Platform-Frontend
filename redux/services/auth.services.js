import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  success: false,
  token: null,
  user: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      // console.log("Action Payload", action);
      const { success, token, user } = action.payload;
      state.success = success;
      state.token = token;
      state.user = user;
    },
    logoutUser: (state) => {
      state.success = false;
      state.token = "";
      state.user = {};
    },
  },
});

export const { setUser, logoutUser } = authSlice.actions;

export const authState = (state) => state.auth;

export default authSlice.reducer;
