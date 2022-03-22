import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserInfo,
} from "firebase/auth";
import { auth } from "../firebase";

type IUserType = Pick<UserInfo, "email" | "uid"> | null | undefined;

export interface AuthState {
  status: "loading" | "idle";
  user: IUserType;
}

export interface UserInfoType {
  email: string;
  password: string;
}

const initialState: AuthState = {
  status: "idle",
  user: undefined,
};

export const signUp = createAsyncThunk(
  "auth/createUser",
  async ({ email, password }: UserInfoType) => {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userData = user.toJSON() as UserInfo;
    return { email: userData.email, uid: userData.uid };
  }
);

export const signIn = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }: UserInfoType) => {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const userData = user.toJSON() as UserInfo;
    return { email: userData.email, uid: userData.uid };
  }
);
export const logOut = createAsyncThunk("auth/logOutUser", async () => {
  return await signOut(auth);
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserType>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(signUp.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.status = "idle";
    });
    builder.addCase(signIn.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.status = "idle";
    });
    builder.addCase(logOut.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(logOut.fulfilled, (state) => {
      state.user = null;
      state.status = "idle";
    });
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
