import { useReducer, createContext } from "react";
import { userReducer } from "./reducers/userReducers";
import { menuReducer } from "./reducers/menuReducers";

const initialState = {
  user: {
    isLogged: false,
    _id: "",
    username: "",
    token: "",
    bookmarks: [],
    likes: [],
    bookmarks: [],
    profilePic: "",
  },
  menu: false,
};

export const Context = createContext({});

const combineReducers =
  (...reducers) =>
  (state, action) => {
    for (let i = 0; i < reducers.length; i++) {
      state = reducers[i](state, action);
    }
    return state;
  };

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(
    combineReducers(userReducer,menuReducer),
    initialState
  );
  const value = { state, dispatch };

  return <Context.Provider value={value}> {children} </Context.Provider>;
};
