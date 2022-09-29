import Link from "next/link";

const MoreCard = ({post}) => {
  return (
    <section className="h-32 w-full flex justify-center items-center px-4 gap-x-4 border-b border-gray-200">
        <img className='w-12 h-12 rounded-full' src="/pic.jpg" alt={post.title.slice(0,5)} />
        <article>
            <h2 className='font-bold'>{post.title}</h2>
            <p className='text-sm py-2'>{post.body.slice(0,100)}</p>
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
  )
}

export default MoreCard;