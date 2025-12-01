import { useMemo, useState } from "react";
import { usePosts } from "../contexts/posts/usePosts";

function PostsUi() {
  const [text, setText] = useState("");
  const [searched, setSearch] = useState([]);

  const { count, dispatch, post, getPost, isLoading, error, posts } =
    usePosts();

  let slicedPosts = useMemo(() => posts.slice(0, 5), [posts]);

  const handleClick = () => {
    const nextCount = count + 1;
    dispatch({ type: "count/increment" });
    getPost(nextCount);
  };

  function handleChange(e) {
    e.preventDefault();
    let value = e.target.value;
    setText(value);

    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(value.toLowerCase())
    );
    setSearch(filtered);
  }

  return (
    <>
      <h1>SEARCH</h1>
      <input name="text" value={text} onChange={handleChange} />

      <div>
        {searched?.map((post) => (
          <h1 key={post.id}>{post.title}</h1>
        ))}
      </div>

      <div>
        <h1>POSTS</h1>
        <div>
          {slicedPosts.map((post) => (
            <h3>{post.title}</h3>
          ))}
        </div>
      </div>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      {/* getting post on click */}
      <button onClick={handleClick}>count: {count}</button>

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
