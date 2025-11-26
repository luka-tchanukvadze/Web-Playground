import { useContext } from "react";
import { PostsContext } from "./PostsContext";

export function usePosts() {
  const context = useContext(PostsContext);
  if (context === undefined) {
    throw new Error("PostsContext is used outside of Posts Provider");
  }

  return context;
}
