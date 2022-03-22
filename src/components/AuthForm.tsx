import React, { SyntheticEvent, useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { signIn, signUp } from "../features/authSlice";

interface IProps {
  login?: boolean;
}

export const AuthForm = ({ login }: IProps) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (login) {
      try {
        setError("");
        setLoading(true);
        dispatch(
          signIn({
            email: emailRef.current?.value as string,
            password: passwordRef.current?.value as string,
          })
        );
        navigate("/", { replace: true });
      } catch {
        setError("Failed to login");
      }
    } else {
      if (passwordRef.current?.value !== passwordConfirmRef.current?.value) {
        return setError("Passwords do not match");
      }
      try {
        setError("");
        setLoading(true);
        dispatch(
          signUp({
            email: emailRef.current?.value as string,
            password: passwordRef.current?.value as string,
          })
        );
        navigate("/", { replace: true });
      } catch {
        setError("Failed to create an account");
      }
    }

    setLoading(false);
  };

  return (
    <>
      <Card style={{ width: "400px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">{login ? "Sign In" : "Sign Up"}</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            {!login ? (
              <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordConfirmRef}
                  required
                />
              </Form.Group>
            ) : null}
            <Button disabled={loading} className="w-100" type="submit">
              {login ? "Sign In" : "Sign Up"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        {login ? "Don't have an account yet?" : "Already have an account?"}
        {login ? (
          <Link to="/signup"> Sign Up</Link>
        ) : (
          <Link to="/signin"> Sign In</Link>
        )}
      </div>
    </>
  );
};
