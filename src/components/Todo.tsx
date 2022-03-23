import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { add } from "../features/todoSlice";
import Loader from "../widgets/Loader";
import TodoList from "./TodoList";

const Todo = () => {
  const [todoInput, setTodoInput] = useState<string | "">("");

  const uid = useAppSelector(
    (state: RootState) => state.auth.user?.uid
  ) as string;
  const dispatch = useAppDispatch();
  const status = useAppSelector((state: RootState) => state.todo.status);

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!todoInput || !todoInput.length) return;
    dispatch(add({ uid, todo: todoInput }));
    setTodoInput("");
  };

  return (
    <>
      <div>
        <form onSubmit={(e) => handleAddTodo(e)}>
          <input
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
          />
          <button type="submit">submit</button>
        </form>
        {status === "loading" ? <Loader /> : <TodoList />}
      </div>
    </>
  );
};

export default Todo;
