import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const PostsContext = createContext();

export default function PostsProvider({ children }) {
  const [count, setCount] = useState(0);

  return (
    <PostsContext.Provider value={{ count, setCount }}>
      {children}
    </PostsContext.Provider>
  );
}
