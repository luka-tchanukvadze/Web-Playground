import { usePosts } from "../contexts/posts/usePosts";

function PostsUi() {
  const { count, dispatch, post, getPost, isLoading, error, posts } =
    usePosts();

  let slicedPosts = posts.slice(0, 5);

  const handleClick = () => {
    const nextCount = count + 1;
    dispatch({ type: "count/increment" });
    getPost(nextCount);
  };

  return (
    <>
      <div>
        <h1>POSTS</h1>
        <div>
          {slicedPosts.map((post) => (
            <h3>{post.title}</h3>
          ))}
        </div>
      </div>
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
