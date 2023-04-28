import { useEffect, useReducer, createContext } from "react";

// Initial State
const initialState = { user: null };

// Create Context
const authContext = createContext();

// Root Reducer
const rootReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

// console.log("initial State", initialState.user);
// Context AuthProvider

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  useEffect(() => {
    dispatch({
      type: "LOGIN",
      payload: JSON.parse(localStorage.getItem("user")),
    });
  }, []);

  return (
    <authContext.Provider value={{ state, dispatch }}>{children}</authContext.Provider>
  );
};

export { authContext, AuthProvider };
