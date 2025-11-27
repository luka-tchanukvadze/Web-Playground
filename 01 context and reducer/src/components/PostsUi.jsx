import { usePosts } from "../contexts/posts/usePosts";

function PostsUi() {
  const { count, dispatch, post, getPost } = usePosts();

  const handleClick = () => {
    const nextCount = count + 1;
    dispatch({ type: "count/increment" });
    getPost(nextCount);
  };

  return (
    <>
      <div onClick={handleClick}>count: {count}</div>

      <div> {post?.id}</div>
    </>
  );
}
export default PostsUi;
