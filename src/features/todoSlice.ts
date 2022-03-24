import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { AppThunk } from "../app/store";
import { db } from "../firebase";

export interface TodoState {
  status: "loading" | "idle";
  value: (ITodoIndexProps & IAddProps)[];
}

export interface IUserIdProps {
  uid: string;
}
export interface ITodoIndexProps {
  id: string;
}
export interface IAddProps {
  todo: string;
}

const initialState: TodoState = {
  status: "idle",
  value: [],
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<ITodoIndexProps & IAddProps>) => {
      if (!action.payload) return;
      state.value.push({ id: action.payload.id, todo: action.payload.todo });
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      if (typeof action.payload !== "string") return;
      const index = state.value.findIndex((item) => item.id === action.payload);
      state.value.splice(index, 1);
    },
    setStatus: (state, action: PayloadAction<"loading" | "idle">) => {
      state.status = action.payload;
    },
    setTodoList: (
      state,
      action: PayloadAction<(ITodoIndexProps & IAddProps)[]>
    ) => {
      state.value = action.payload;
    },
  },
});

export const { addTodo, removeTodo, setStatus, setTodoList } =
  todoSlice.actions;

export const add =
  ({ uid, todo }: IAddProps & IUserIdProps): AppThunk =>
  async (dispatch, getState) => {
    const docRef = await addDoc(collection(db, `${uid}`), {
      todo,
    });
    dispatch(addTodo({ id: docRef.id, todo }));
  };

export const remove =
  ({ uid, id }: IUserIdProps & ITodoIndexProps): AppThunk =>
  async (dispatch, getState) => {
    await deleteDoc(doc(db, `${uid}`, `${id}`));
    dispatch(removeTodo(id));
  };

export const setTodo =
  ({ uid }: IUserIdProps): AppThunk =>
  async (dispatch) => {
    const list: (ITodoIndexProps & IAddProps)[] = [];
    dispatch(setStatus("loading"));
    const querySnapshot = await getDocs(collection(db, `${uid}`));
    querySnapshot.forEach((item) => {
      list.push({ id: item.id, todo: item.data().todo });
    });
    dispatch(setTodoList(list));
    dispatch(setStatus("idle"));
  };

export default todoSlice.reducer;
