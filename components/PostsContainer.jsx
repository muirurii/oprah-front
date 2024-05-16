import Post from "./Post";

const PostsContainer = ({ posts }) => {
  return (
    <section className="my-6 grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 placer gap-y-12">
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </section>
  );
};

export default PostsContainer;
