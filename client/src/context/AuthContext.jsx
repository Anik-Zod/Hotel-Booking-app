import { createContext, useEffect, useReducer } from "react";


const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: true, // start with loading = true
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return { user: null, loading: true, error: null };

    case "LOGIN_SUCCESS":
      return { user: action.payload, loading: false, error: null };

    case "LOGIN_FAILURE":
      return { user: null, loading: false, error: action.payload };

    case "LOGOUT":
      localStorage.removeItem("user");
      return { user: null, loading: false, error: null };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  // ✅ Load user from session on app start
  useEffect(() => {
    const loadSession = async () => {
      dispatch({ type: "LOGIN_START" });
      try {
        const session = await authClient.getSession();
        if (session?.data?.user) {
          dispatch({ type: "LOGIN_SUCCESS", payload: session.data.user });
        } else {
          dispatch({ type: "LOGIN_FAILURE", payload: null });
        }
      } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err });
      }
    };

    loadSession();
  }, []);

  // ✅ Sync localStorage
  useEffect(() => {
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user));
    }
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
