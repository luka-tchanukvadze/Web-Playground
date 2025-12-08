import { createContext, useEffect, useReducer } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const PostsContext = createContext();

const initialState = {
  count: 0,
  post: {},
  posts: [],
  searchedPost: [],
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
        error: "",
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
    case "posts/loaded":
      return {
        ...state,
        posts: action.payload,
        isLoading: false,
      };

    case "rejected":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case "posts/searched":
      return {
        ...state,
        searchedPost: action.payload,
      };

    default:
      throw new Error("Action unknown");
  }
}

export default function PostsProvider({ children }) {
  const [{ count, post, isLoading, error, posts, searchedPost }, dispatch] =
    useReducer(reducer, initialState);

  const fetchPosts = async () => {
    dispatch({ type: "loading" });
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");

      if (!res.ok) throw new Error("Error fetching posts");

      const data = await res.json();

      dispatch({ type: "posts/loaded", payload: data });
    } catch (error) {
      console.log(error.message);
      dispatch({ type: "rejected", payload: error.message });
    }
  };

  const getPost = async (id) => {
    dispatch({ type: "loading" });

    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );

      if (!res.ok) {
        throw new Error("Request fialed");
      }

      const data = await res.json();
      dispatch({ type: "post/loaded", payload: data });
    } catch (error) {
      console.log("aaa", error.message);
      dispatch({ type: "rejected", payload: error.message });
    }
  };

  function searchPost(value) {
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(value.toLowerCase())
    );
    dispatch({ type: "posts/searched", payload: filtered });
  }

  function increaseNumber() {
    const nextCount = count + 1;
    dispatch({ type: "count/increment" });
    getPost(nextCount);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <PostsContext.Provider
      value={{
        count,
        dispatch,
        getPost,
        post,
        isLoading,
        error,
        posts,
        searchedPost,
        searchPost,
        increaseNumber,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}
