import Post from "./Post";

const HomeCategory = ({posts,heading}) => {
    console.log(posts);
  return (
    <section>
        <h1 className="text-3xl text-bold p-4">{heading}</h1>
        <div className="grid grid-cols-3 px-4 gap-4">
          {posts.map(post => <Post key={post.id} post={post}/>)}
        </div>
      </section>
  )
}

export default HomeCategory