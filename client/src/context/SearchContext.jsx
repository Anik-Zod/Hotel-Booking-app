import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  city: "Berlin",
  dates: [
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ],
  options: {
    adult: 1,
    children: 0,
    room: 1,
  },
};

// আগে এখানে ছিল

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return {
        ...state,
        ...action.payload,
      };
      default:
        return state;
      }
    };
    
export const SearchContext = createContext(INITIAL_STATE);

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  return (
    <SearchContext.Provider
      value={{
        city: state.city,
        dates: state.dates,
        options: state.options,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
