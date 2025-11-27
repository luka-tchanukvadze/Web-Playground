import { createContext, useReducer } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const PostsContext = createContext();

const initialState = {
  count: 0,
  post: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "count/increment":
      return {
        ...state,
        count: state.count + 1,
      };

    case "post/loaded":
      return {
        ...state,
        post: action.payload,
      };

    default:
      throw new Error("Action unknown");
  }
}

export default function PostsProvider({ children }) {
  const [{ count, post }, dispatch] = useReducer(reducer, initialState);

  const getPost = async (id) => {
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      const data = await res.json();
      dispatch({ type: "post/loaded", payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <PostsContext.Provider value={{ count, dispatch, getPost, post }}>
      {children}
    </PostsContext.Provider>
  );
}
