import { useMemo, useState } from "react";
import { usePosts } from "../contexts/posts/usePosts";

function PostsUi() {
  const [text, setText] = useState("");

  const {
    count,
    post,
    isLoading,
    error,
    posts,
    searchPost,
    searchedPost,
    increaseNumber,
    twoPayload,
    myName,
  } = usePosts();

  let slicedPosts = useMemo(() => posts.slice(0, 5), [posts]);

  function handleChange(e) {
    let value = e.target.value;
    setText(value);
    searchPost(value);
  }

  return (
    <>
      <h1>{twoPayload || "Wait for it..."} - he he</h1>
      <button onClick={() => myName({ name: "Luka", lastName: "Chanu" })}>
        Set my name
      </button>
      <h1>SEARCH</h1>
      <input name="text" value={text} onChange={handleChange} />

      <div>
        {searchedPost?.map((post) => (
          <h1 key={post.id}>{post.title}</h1>
        ))}
      </div>

      <div>
        <h1>POSTS</h1>
        <div>
          {slicedPosts.map((post) => (
            <h3 key={post.id}>{post.title}</h3>
          ))}
        </div>
      </div>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      {/* getting post on click */}
      <button onClick={increaseNumber}>count: {count}</button>

      {isLoading ? <div>Loading....</div> : <div> {post?.title}</div>}
      {error && <div>{error}</div>}

      {/* <button
        onClick={() => {
          dispatch({ type: "reset" });
        }}
      >
        reset
      </button> */}
    </>
  );
}
export default PostsUi;
