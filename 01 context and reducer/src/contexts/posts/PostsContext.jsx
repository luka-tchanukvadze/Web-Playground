import { createContext, useReducer } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const PostsContext = createContext();

const initialState = {
  count: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "increaseCount":
      return {
        ...state,
        count: state.count + 1,
      };

    default:
      throw new Error("Action unknown");
  }
}

export default function PostsProvider({ children }) {
  const [{ count }, dispatch] = useReducer(reducer, initialState);

  return (
    <PostsContext.Provider value={{ count, dispatch }}>
      {children}
    </PostsContext.Provider>
  );
}
