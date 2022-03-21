import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  getAuth,
  UserCredential,
} from "firebase/auth";

export interface AuthState {
  user: UserCredential | null;
}

export interface UserInfoType {
  email: string;
  password: string;
}

const initialState: AuthState = {
  user: null,
};

const auth = getAuth();

export const signUp = createAsyncThunk(
  "auth/createUser",
  async ({ email, password }: UserInfoType) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    signIn: (state, action: PayloadAction<string, string>) => {},
    signOut: (state) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, (state, { payload }) => {
      state.user = payload;
    });
  },
});

export const { setUser, signIn, signOut } = authSlice.actions;

export default authSlice.reducer;
