// @ts-ignore
import { onAuthStateChanged, UserInfo } from "firebase/auth";
import React, { FC, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { setUser } from "../features/authSlice";
import { auth } from "../firebase";
import { AuthForm } from "./AuthForm";
import Home from "./Home";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Todo from "./Todo";

const App: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, uid } = user?.toJSON() as UserInfo;
        dispatch(setUser({ email, uid }));
      } else dispatch(setUser(null));
    });

    return unsubcribe;
  }, [dispatch]);

  return (
    <>
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
    </>
  );
};

export default App;
