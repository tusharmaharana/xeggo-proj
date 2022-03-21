import React, { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { addTodo } from "../features/todoSlice";
import TodoList from "./TodoList";

const Todo = () => {
  const [todoInput, setTodoInput] = useState<string | "">("");

  const dispatch = useAppDispatch();

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!todoInput || !todoInput.length) return;
    dispatch(addTodo(todoInput));
    setTodoInput("");
  };

  return (
    <div>
      <form onSubmit={(e) => handleAddTodo(e)}>
        <input
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
        />
        <button type="submit">submit</button>
      </form>
      <TodoList />
    </div>
  );
};

export default Todo;
