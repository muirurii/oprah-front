import Link from "next/link";
import Reactions from "./Reactions";

const Post = ({ post }) => {

  return (
    <section className="p-4 max-w-[320px] md:max-w-[500px]">
      <div className="h-full border-2 border-gray-50 border-opacity-60 rounded-lg overflow-hidden">
        <img
          className="lg:h-48 md:h-36 w-full object-cover object-center"
          src="pic.jpg"
          alt="blog"
        />
        <div className="p-4">
          <p className="mb-1 text-xs">{new Date(post.createdAt).toLocaleDateString("en-GB",{
            dateStyle:"full"
          })}</p>
          <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
            {post.title}
          </h1>
          <p className="leading-relaxed mb-3 break-words">{post.body.slice(0, 100)}...</p>
          <div className="flex items-center justify-between">
            <Link href={"/posts/[slug]"} as={`/posts/${post.slug}`}>
              <a className="text-secondary inline-flex items-center md:mb-2 lg:mb-0">
                Read More
                <svg
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </Link>
            <Reactions post={post} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Post;
