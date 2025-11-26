import { usePosts } from "../contexts/posts/usePosts";

function PostsUi() {
  const { count } = usePosts();
  return <div>count: {count}</div>;
}
export default PostsUi;
