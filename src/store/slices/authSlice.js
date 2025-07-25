import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../services/AuthService';
import { AUTH_TOKEN } from '../../constants/AuthConstant';

const tokenFromStorage = localStorage.getItem(AUTH_TOKEN) || null;

const initialState = {
  token: tokenFromStorage,
  loading: false,
  error: null
};

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const token = await AuthService.login(credentials);
    localStorage.setItem(AUTH_TOKEN, token);
    return token;
  } catch (err) {
    return rejectWithValue(err.message || 'Login failed');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem(AUTH_TOKEN);
      state.token = null;
    },
    signOutSuccess: (state) => {
      state.loading = false;
      state.token = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { logout, signOutSuccess } = authSlice.actions;
export default authSlice.reducer;
