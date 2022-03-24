import { onAuthStateChanged, UserInfo } from "firebase/auth";
import React, { FC, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { setUser } from "../features/authSlice";
import { setTodo } from "../features/todoSlice";
import { auth } from "../firebase";
import { AuthForm } from "./AuthForm";
import Home from "./Home";
import Navbar from "./Navbar";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Todo from "./Todo";
import Loader from "./widgets/Loader";

const App: FC = () => {
  const authState = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, uid } = user?.toJSON() as UserInfo;
        dispatch(setUser({ email, uid }));
      } else dispatch(setUser(null));
    });

    dispatch(setTodo({ uid: authState.user?.uid as string }));

    return unsubcribe;
  }, [dispatch, authState.user?.uid]);

  return (
    <>
      {authState.status === "loading" || authState.user === undefined ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <Container className="d-flex flex-column align-items-center">
            <Routes>
              <Route path="/" element={<PublicRoute restricted={false} />}>
                <Route path="" element={<Home />} />
              </Route>
              <Route path="/signin" element={<PublicRoute restricted={true} />}>
                <Route path="" element={<AuthForm login />} />
              </Route>
              <Route path="/signup" element={<PublicRoute restricted={true} />}>
                <Route path="" element={<AuthForm />} />
              </Route>
              <Route path="/todo" element={<PrivateRoute />}>
                <Route path="" element={<Todo />} />
              </Route>
            </Routes>
          </Container>
        </>
      )}
    </>
  );
};

export default App;
