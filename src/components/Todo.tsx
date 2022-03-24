import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup, Spinner } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { add } from "../features/todoSlice";
import TodoList from "./TodoList";
import Loader from "./widgets/Loader";

const Todo = () => {
  const uid = useAppSelector(
    (state: RootState) => state.auth.user?.uid
  ) as string;
  const dispatch = useAppDispatch();
  const todoList = useAppSelector((state: RootState) => state.todo.value);
  const status = useAppSelector((state: RootState) => state.todo.status);

  const [todoInput, setTodoInput] = useState<string | "">("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(false);
    setTodoInput("");
  }, [todoList]);

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(loading);

    e.preventDefault();
    setLoading(true);
    if (!todoInput || !todoInput.length) {
      setLoading(false);
      return;
    }
    dispatch(add({ uid, todo: todoInput }));
  };

  return (
    <div className="d-flex flex-column align-items-center w-100">
      <StyledForm className="" onSubmit={(e) => handleAddTodo(e)}>
        <InputGroup>
          <Form.Control
            placeholder="Todo"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
          />
          <Button type="submit" disabled={loading}>
            Add
            {loading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="mx-2"
              />
            ) : null}
          </Button>
        </InputGroup>
      </StyledForm>
      <div style={{ width: "70%" }}>
        {status === "loading" ? <Loader /> : <TodoList />}
      </div>
    </div>
  );
};

export default Todo;

const StyledForm = styled(Form)`
  width: 80%;
`;
