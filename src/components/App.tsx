// @ts-ignore
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { FC, useEffect } from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import { setUser } from "../features/authSlice";
import { AuthForm } from "./AuthForm";

const App: FC = () => {
  
  useEffect(() => {
    const auth = getAuth();
    const unsubcribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return unsubcribe;
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* <PublicRoute restricted={false} component={Home} path="/" exact />
        <PublicRoute
          restricted={true}
          component={AuthForm}
          path="/signin"
          exact
        />
        <PrivateRoute component={Todo} path="/todo" exact /> */}
        <AuthForm />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
