import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Auth, createUserWithEmailAndPassword, UserInfo } from "firebase/auth";

export interface AuthState {
  user: UserInfo | null;
}

export interface UserInfoType {
  auth: Auth;
  email: string;
  password: string;
}

const initialState: AuthState = {
  user: null,
};

export const signUp = createAsyncThunk(
  "auth/createUser",
  async ({ auth, email, password }: UserInfoType) => {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredentials.user;
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
