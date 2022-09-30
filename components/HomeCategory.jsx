import Post from "./Post";
import PostsContainer from "./PostsContainer";

const HomeCategory = ({ posts, heading }) => {
  return (
    <article>
      <h1 className="text-3xl text-bold p-4">{heading}</h1>
      <PostsContainer posts={posts} />
    </article>
  );
};

export default HomeCategory;
