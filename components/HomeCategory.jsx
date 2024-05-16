import Heading from "./Heading";
import Post from "./Post";

const HomeCategory = ({ posts, heading }) => {
  return (
    <div>
      <Heading text={heading} />
      <section className="my-6 grid md:grid-cols-2 xl:grid-cols-3 place-items-center gap-y-16 gap-x-4">
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </section>
    </div>
  );
};

export default HomeCategory;
