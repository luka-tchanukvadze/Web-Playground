import { createContext, useEffect, useReducer, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const PostsContext = createContext();

const initialState = {
  count: 0,
  post: {},
  isLoading: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "reset":
      return initialState;

    case "loading":
      return {
        ...state,
        isLoading: true,
      };

    case "count/increment":
      return {
        ...state,
        count: state.count + 1,
      };

    case "post/loaded":
      return {
        ...state,
        post: action.payload,
        isLoading: false,
      };

    case "rejected":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    default:
      throw new Error("Action unknown");
  }
}

export default function PostsProvider({ children }) {
  const [{ count, post, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");

        if (!res.ok) throw new Error("Error fetching posts");

        const data = await res.json();

        setPosts(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchPosts();
  }, []);

  const getPost = async (id) => {
    dispatch({ type: "loading" });

    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/psts/${id}`
      );

      if (!res.ok) {
        throw new Error("Request fialed");
      }

      const data = await res.json();
      dispatch({ type: "post/loaded", payload: data });
    } catch (error) {
      console.log("aaa", error.message);
      dispatch({ type: "rejected", payload: "Could not fetch" });
    }
  };

  return (
    <PostsContext.Provider
      value={{ count, dispatch, getPost, post, isLoading, error, posts }}
    >
      {children}
    </PostsContext.Provider>
  );
}
