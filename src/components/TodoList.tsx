import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { removeTodo } from "../features/todoSlice";

const TodoList = () => {
  const todoList = useAppSelector((state: RootState) => state.todo.value);

  const dispatch = useAppDispatch();

  const handleRemoveTodo = (index: number) => {
    dispatch(removeTodo(index));
  };

  return (
    <>
      {todoList.map((todo, index) => (
        <div>
          {todo}
          <button onClick={() => handleRemoveTodo(index)}>remove</button>
        </div>
      ))}
    </>
  );
};

export default TodoList;
