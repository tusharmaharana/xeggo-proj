// @ts-ignore
import { onAuthStateChanged } from "firebase/auth";
import React, { FC, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { setUser } from "../features/authSlice";
import { auth } from "../firebase";
import { AuthForm } from "./AuthForm";
import Home from "./Home";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Todo from "./Todo";

const App: FC = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state: RootState) => state.auth.user);
  console.log(currentUser);
  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user));
      console.log(user);
      console.log(currentUser);
    });

    return unsubcribe;
  }, [dispatch, currentUser]);

  return (
    <Routes>
      <Route path="/" element={<PublicRoute restricted={false} />}>
        <Route path="" element={<Home />} />
      </Route>
      <Route path="/signin" element={<PublicRoute restricted={true} />}>
        <Route path="" element={<AuthForm />} />
      </Route>
      <Route path="/todo" element={<PrivateRoute />}>
        <Route path="" element={<Todo />} />
      </Route>
    </Routes>
  );
};

export default App;
