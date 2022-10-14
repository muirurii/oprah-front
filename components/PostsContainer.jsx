import Post from './Post';

const PostsContainer = ({posts}) => {
  return (
    <section className="my-6 flex flex-wrap justify-center md:justify-start items-start gap-8">
        {posts.map(post => <Post key={post._id} post={post}/>)}
    </section>
  )
}

export default PostsContainer;