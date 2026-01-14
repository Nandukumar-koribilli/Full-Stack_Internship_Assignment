import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  preferences: {
    theme: 'dark',
    notifications: true,
    currency: 'USD',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    updateUserProfile: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    clearUser: (state) => {
      state.user = null;
    },
    updatePreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    toggleNotifications: (state) => {
      state.preferences.notifications = !state.preferences.notifications;
    },
  },
});

export const { 
  setUser, 
  updateUserProfile, 
  clearUser, 
  updatePreferences, 
  toggleNotifications 
} = userSlice.actions;

export default userSlice.reducer;
