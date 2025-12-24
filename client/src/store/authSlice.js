import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authClient } from '../../lib/auth-client';
import axiosInstance from '../api/axios';

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post('/auth/sign-in/email', {
        email,
        password,
        rememberMe: true,
      });
      if (!data?.user) throw new Error('Login failed');

      localStorage.setItem('user', JSON.stringify(data.user));
      return data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Invalid email or password');
    }
  }
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  try {
    localStorage.removeItem('user');
    await authClient.signOut();
  } catch (error) {
    localStorage.removeItem('user');
  }
  return null;
});

// Initial state
const userFromStorage = JSON.parse(localStorage.getItem('user'));
const initialState = {
  user: userFromStorage || null,
  loading: false,
  error: null,
  isAuthenticated: !!userFromStorage,
};

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => { state.error = null; },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      action.payload
        ? localStorage.setItem('user', JSON.stringify(action.payload))
        : localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.isAuthenticated = false;
      })
      // Logout
      .addCase(logoutUser.pending, (state) => { state.loading = true; })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      });
  },
});

export const { clearError, setUser } = authSlice.actions;
export default authSlice.reducer;
