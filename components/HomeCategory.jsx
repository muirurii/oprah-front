import PostsContainer from "./PostsContainer";

const HomeCategory = ({ posts, heading }) => {
  return (
    <div>
      <h1 className="text-3xl text-bold p-4">{heading}</h1>
      <PostsContainer posts={posts} />
    </div>
  );
};

export default HomeCategory;
