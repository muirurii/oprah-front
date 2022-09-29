import Post from "./Post";
import PostsContainer from "./PostsContainer";

const HomeCategory = ({posts,heading}) => {
  return (
    <section>
        <h1 className="text-3xl text-bold p-4">{heading}</h1>
        <PostsContainer posts={posts}/>
      </section>
  )
}

export default HomeCategory