import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { remove } from "../features/todoSlice";
import Loader from "../widgets/Loader";

const TodoList = () => {
  const todoList = useAppSelector((state: RootState) => state.todo.value);
  const status = useAppSelector((state: RootState) => state.todo.status);
  const uid = useAppSelector(
    (state: RootState) => state.auth.user?.uid
  ) as string;

  const dispatch = useAppDispatch();

  const handleRemoveTodo = (id: string) => {
    dispatch(remove({ uid, id }));
  };

  return (
    <>
      {status === "loading" ? (
        <Loader />
      ) : (
        todoList.map((item) => (
          <div key={item.id}>
            {item.todo}
            <button onClick={() => handleRemoveTodo(item.id)}>remove</button>
          </div>
        ))
      )}
    </>
  );
};

export default TodoList;
