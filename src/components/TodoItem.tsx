import styled from "@emotion/styled";
import React, { useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { IAddProps, ITodoIndexProps, remove } from "../features/todoSlice";

interface ITodoItemProps {
  todo: ITodoIndexProps & IAddProps;
}

const TodoItem = ({ todo }: ITodoItemProps) => {
  const uid = useAppSelector(
    (state: RootState) => state.auth.user?.uid
  ) as string;
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);

  const handleRemoveTodo = (id: string) => {
    setLoading(true);
    dispatch(remove({ uid, id }));
  };

  return (
    <StyledContainer>
      <Card className="d-flex flex-row justify-content-between border-0 my-3">
        <Card.Text className="d-inline m-2"> {todo.todo}</Card.Text>
        <StyledButton className="m-2" onClick={() => handleRemoveTodo(todo.id)}>
          {loading ? (
            <Spinner animation="border" role="status" style={buttonStyles}>
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <FaTrash className="text-danger" style={buttonStyles} />
          )}
        </StyledButton>
      </Card>
      <hr style={{ margin: "-5px 0" }} />
    </StyledContainer>
  );
};

export default TodoItem;

const StyledContainer = styled.div`
  display: list-item;
`;
const StyledButton = styled.div`
  cursor: pointer;
`;
const buttonStyles = {
  width: "1.3rem",
  height: "1.3rem",
};
