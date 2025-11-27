import { usePosts } from "../contexts/posts/usePosts";

function PostsUi() {
  const { count, dispatch, post, getPost, isLoading, error } = usePosts();

  const handleClick = () => {
    const nextCount = count + 1;
    dispatch({ type: "count/increment" });
    getPost(nextCount);
  };

  return (
    <>
      <button onClick={handleClick}>count: {count}</button>

      {isLoading ? <div>Loading....</div> : <div> {post?.title}</div>}
      {error && <div>{error}</div>}

      <button
        onClick={() => {
          dispatch({ type: "reset" });
        }}
      >
        reset
      </button>
    </>
  );
}
export default PostsUi;
