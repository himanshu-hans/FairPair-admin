import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  access_token: null,
  refresh_token: null, 
  userId: null,
  userEmail: null,
  rememberMe: false,
  username: null,
  profileImage: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token || null; 
      state.userId = action.payload.userId;
      state.userEmail = action.payload.userEmail;
      state.rememberMe = action.payload.rememberMe || false;
      state.username = action.payload.username;
      state.profileImage = action.payload.profileImage;
    },
    logout: (state) => {
      state.access_token = null;
      state.refresh_token = null; 
      state.userId = null;
      state.userEmail = null;
      state.rememberMe = false;
      state.username = null;
      state.profileImage = null;
    },
    setRememberMe: (state, action) => {
      state.rememberMe = action.payload;
    },
    updateUserProfile: (state, action) => {
      if (action.payload.username) {
        state.username = action.payload.username;
      }
    },
  },
});

export const {
  loginSuccess,
  logout,
  setRememberMe,
  updateUserProfile,
} = authSlice.actions;

export default authSlice.reducer;