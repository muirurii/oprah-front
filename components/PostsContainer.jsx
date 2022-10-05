import Post from './Post';

const PostsContainer = ({posts}) => {
  return (
    <section className="grid md:grid-cols-2 lg:grid-cols-3 px-1 sm:px-4 my-8 gap-4">
        {posts.map(post => <Post key={post._id} post={post}/>)}
    </section>
  )
}

export default PostsContainer;