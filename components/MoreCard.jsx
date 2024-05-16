import Link from "next/link";

const MoreCard = ({ post }) => {
  return (
    <section
      className="min-h-[140px] w-full bg-red break-all text-sm font-lightcursor-pointer hover:bg-slate-100
      flex flex-col sm:flex-row sm:justify-start sm:items-center p-4 gap-x-4 border-b border-slate-400 last:border-none"
    >
      <div className="mb-2 relative w-full sm:mb-0 sm:w-24 h-36 sm:h-24">
        <img
          className="mb-2 w-full h-full object-cover"
          src={post.image}
          alt={post.title.slice(0, 5)}
        />
      </div>
      <article className="w-[calc(100%-96px)] sm:w-[calc(100%-144px)]">
        <h2 className="font-bold">
          {post.title.slice(0, 60)} {post.title.length > 60 ? "..." : null}
        </h2>
        <p className="text-sm py-1">{post.excerpt.slice(0, 100)}...</p>
        <Link href={"/posts/[slug]"} as={`/posts/${post.slug}`}>
          <a className="text-secondary inline-flex items-center text-sm">
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
      </article>
    </section>
  );
};

export default MoreCard;
