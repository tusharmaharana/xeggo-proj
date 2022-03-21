import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Auth, createUserWithEmailAndPassword, UserInfo } from "firebase/auth";

type IUserType = Pick<UserInfo, "email" | "uid"> | null;

export interface AuthState {
  user: IUserType;
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
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userData = user.toJSON() as UserInfo;
    return { email: userData.email, uid: userData.uid };
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserType>) => {
      state.user = action.payload;
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
