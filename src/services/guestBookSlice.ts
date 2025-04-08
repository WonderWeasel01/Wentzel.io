import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Signature } from '../pages/guest-book';
import { saveSignature, getSignatures } from '../services/guestbookApi';

export const addSignature = createAsyncThunk(
  'guestBook/addSignature',
  async (signature: Signature) => {
    const response = await saveSignature(signature);
    return response.data;
  }
);

export const fetchSignatures = createAsyncThunk(
  'guestBook/fetchSignatures',
  async () => {
    const response = await getSignatures();
    return response.data;
  }
);

interface GuestBookState {
  signatures: Signature[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: GuestBookState = {
  signatures: [],
  status: 'idle',
  error: null,
};

const guestBookSlice = createSlice({
  name: 'guestBook',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addSignature.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addSignature.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.signatures.push(action.payload);
      })
      .addCase(addSignature.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default guestBookSlice.reducer;
