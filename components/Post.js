import Link from "next/link";

const Post = ({post}) => {
  return (
    <div className="shadow-sm grid shadow-gray-300 bg-gray-50 p-4 rounded-lg">
        <h2 className="text-2xl font-bold">{post.title}</h2>
        <img src="pic.jpg" className="h-48 w-full my-4 rounded-lg" alt={post.title.slice(0,6)} />
        <div className="flex flex-col">{post.body.slice(0,60) + "..."}
        <div className="flex justify-between items-center bg-red-300 mt-4">
          <Link href="/posts/[id]" as={`/posts/${post.id}`}>
            <a className= "inline-block bg-black rounded py-2 px-3 w-fit text-white">Read More</a>
          </Link>
          <div className="flex font-light text-sm items-center justify-center gap-2">
            <p>{post.author}</p>
            <p>{
            new Date(post.date).toLocaleString("en-GB", {
              dateStyle: "short",
            })
            }</p>
            <p>{post.views}</p>
          </div>
        </div>
        </div>
    </div>
  )
}

export default Post;