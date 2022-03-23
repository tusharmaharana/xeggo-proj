import React from "react";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const todoList = useAppSelector((state: RootState) => state.todo.value);

  return (
    <React.Fragment>
      {todoList.map((item) => (
        <TodoItem key={item.id} todo={item} />
      ))}
    </React.Fragment>
  );
};

export default TodoList;
