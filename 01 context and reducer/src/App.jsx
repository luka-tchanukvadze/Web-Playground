import PostsProvider from "./contexts/posts/PostsContext";
import Posts from "./pages/Posts";

function App() {
  return (
    <PostsProvider>
      <Posts />
    </PostsProvider>
  );
}

export default App;
