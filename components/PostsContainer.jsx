import Post from './Post';

const PostsContainer = ({posts}) => {
  return (
    <div className="grid grid-cols-3 px-4 my-8 gap-4">
        {posts.map(post => <Post key={post._id} post={post}/>)}
    </div>
  )
}

export default PostsContainer;