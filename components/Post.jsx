import Link from "next/link";
import Reactions from "./Reactions";
import useRelativeTime from "../customFunctions/useRelativeTime";

const Post = ({ post }) => {
  const relativeTime = useRelativeTime(post.createdAt);

  return (
    <section className="px-4 group cursor-pointer max-w-[700px]">
      <div className="h-fit border border-slate-300 border-opacity-60 rounded-lg overflow-hidden">
        <div className="h-64 overflow-hidden">
          <img
            className="h-64 w-full object-cover mb-2 group-hover:scale-110 transition-transform duration-300"
            src={post.image}
            alt="blog"
          />
        </div>
        <div className="px-4 py-8 ">
          <div className="mb-1 flex items-center justify-between text-xs">
            <p>{relativeTime}</p>
            <div className="flex items-center justify-end gap-x-2">
              <p className="text-normal text-secondary">
                By {post.creator.username}
              </p>
              {post.creator.profilePic.length ? (
                <img
                  className="rounded-full h-8 w-8"
                  src={post.creator.profilePic}
                  alt={post.creator.username}
                />
              ) : null}
            </div>
          </div>
          <h1 className="text-lg font-sec font-semibold text-gray-900 mb-3">
            {post.title.slice(0, 100)} {post.title.length > 100 ? "..." : null}
          </h1>
          <p className="leading-relaxed text-sm font-light mb-3 break-all">
            {post.excerpt.slice(0, 100)}...
          </p>
          <div className="flex items-center justify-between text-sm">
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
