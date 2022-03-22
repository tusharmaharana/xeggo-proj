/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import React, { ReactElement } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { logOut } from "../features/authSlice";

const Navbar = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state: RootState) => state.auth.user);

  const handleLogOut = async (): Promise<void> => {
    dispatch(logOut());
    navigate("/", { replace: true });
  };
  const handleSignIn = async (): Promise<void> => {
    navigate("/signin", { replace: true });
  };

  return (
    <Nav className="d-flex justify-content-between">
      <div
        className="p-0 d-flex align-items-center"
        style={{ cursor: "pointer" }}
        onClick={(): void => {
          navigate("/", { replace: true });
        }}
      >
        <h4
          style={{
            color: "black",
            fontWeight: 700,
            margin: 0,
            marginLeft: "10px",
          }}
        >
          Xeggo-Project
        </h4>
      </div>
      <div className="d-flex justify-content-end">
        <div className="d-flex align-items-center">
          <StyledButton
            onClick={(): void => navigate("/todo", { replace: true })}
          >
            Todo
          </StyledButton>

          {!!currentUser ? (
            <StyledButton variant="danger" onClick={handleLogOut}>
              Log Out
            </StyledButton>
          ) : (
            <StyledButton variant="primary" onClick={handleSignIn}>
              Sign In
            </StyledButton>
          )}
        </div>
      </div>
    </Nav>
  );
};

const Nav = styled.div`
  width: 90%;
  margin: 20px auto;
  padding: 15px;
  border-radius: 15px;
  background-color: #f7f7ff;
`;

const StyledButton = styled(Button)`
  margin: 5px;
`;

export default Navbar;
