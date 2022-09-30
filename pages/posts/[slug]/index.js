import { useRouter } from "next/router";
import Comment from "../../../components/Comment";
import Meta from "../../../components/Meta";
import MoreCard from "../../../components/MoreCard";
import PostsContainer from "../../../components/PostsContainer";
import fetchData from "../../../customFunctions/fetch";
// import { useEffect, useState } from "react";

const PostPage = ({ post, recommended }) => {
  const router = useRouter();

  const goBack = () => {
    router.replace("/");
  };

  return (
    <div className="p-4 mb-8">
        <Meta description={post.body.slice(0,100)} 
              keywords={post.title.slice(0,100)}
              title={post.title.slice(0,50)}
        />
      <button
        className="bg-black text-white py-1 px-4 rounded-sm"
        onClick={goBack}
      >
        Home{" "}
      </button>{" "}
      <div className="mt-4 flex items-start justify-center gap-4 relative">
        <div className="max-w-2xl border shadow-sm shadow-gray-100 rounded-md p-4 pb-6">
          <h1 className="font-bold text-2xl"> {post.title} </h1>{" "}
          <div className="flex justify-between items-center my-4">
            <p className="text-sm text-gray-400">
              <span> By {post.creator.username} </span>{" "}
              <span className="inline-block pl-4">
                {" "}
                {new Date(post.createdAt).toLocaleDateString()}{" "}
              </span>{" "}
            </p>{" "}
            <div className="self-en">
              <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1">
                <svg
                  className="w-4 h-4 mr-1"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z">
                    {" "}
                  </path>{" "}
                  <circle cx="12" cy="12" r="3">
                    {" "}
                  </circle>{" "}
                </svg>{" "}
                {post.views}{" "}
              </span>{" "}
              <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1">
                <svg
                  className="w-4 h-4 mr-1"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z">
                    {" "}
                  </path>{" "}
                  <circle cx="12" cy="12" r="3">
                    {" "}
                  </circle>{" "}
                </svg>{" "}
                {post.likes.length}{" "}
              </span>{" "}
              <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                <svg
                  className="w-4 h-4 mr-1"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z">
                    {" "}
                  </path>{" "}
                </svg>{" "}
                {post.comments.length}{" "}
              </span>{" "}
            </div>{" "}
          </div>{" "}
          <img
            src="/pic.jpg"
            className="w-full h-[400px] rounded-md"
            alt={post.title.slice(0, 6)}
          />{" "}
          <p className="py-4"> {post.body} </p>{" "}
          <form className="px-2 pb-2">
            <textarea
              rows={5}
              className="border min-h-[80px] rounded outline-none pl-2 focus:border-secondary transition-colors duration-300 border-black w-full"
              placeholder="Leave your reply..."
            ></textarea>{" "}
            <button className="inline-block rounded text-white my-2 py-2 px-3 bg-secondary">
              comment{" "}
            </button>{" "}
          </form>{" "}
          <div className="min-h-[100px]">
            <p className="px-4 pt-2"> Comments </p>{" "}
            <div className="p-4 flex flex-col gap-4">
              {" "}
              {post.comments.length ? (
                post.comments.map((comm) => (
                  <Comment key={comm._id} comment={comm} />
                ))
              ) : (
                <p className="text-sm text-gray-500"> No comments </p>
              )}{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <div className="w-1/3 shadow-sm shadow-gray-200">
          <h2 className="bg-secondary text-white p-4"> Read also </h2>{" "}
          <div className="flex flex-col">
            {" "}
            {recommended
              .filter((p) => p._id !== post._id)
              .map((post) => (
                <MoreCard key={post._id} post={post} />
              ))}{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export const getStaticPaths = async () => {
  const res = await fetchData('posts',"GET");
  const posts = await res.json();

  const slugs = posts.map((post) => post.slug);
  const paths = slugs.map((slug) => ({ params: { slug: slug.toString() } }));
 
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async (context) => {
  const res = await fetchData(`posts/${context.params.slug}`);

  if (res.status !== 200) {
    return {
      notFound: true,
    };
  }
  const data = await res.json();

  return {
    props: {
      post: data.post,
      recommended: data.recommended,
      revalidate: 2,
    },
  };
};

export default PostPage;
