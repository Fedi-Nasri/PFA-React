import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  currentUser: JSON.parse(localStorage.getItem("user")) || null,
  currentRole: JSON.parse(localStorage.getItem("access")) || null,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.currentUser));
    localStorage.setItem("access", JSON.stringify(state.currentRole));

  }, [state.currentUser, state.currentRole]);

  return (
    <AuthContext.Provider value={{ currentUser: state.currentUser, currentRole: state.currentRole,dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};