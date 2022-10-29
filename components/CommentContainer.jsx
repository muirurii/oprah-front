import { useState, useEffect } from "react";
import fetchData from "../customFunctions/fetch";
import Comment from "./Comment";
import Link from "next/link";
import { useContext } from "react";
import { Context } from "../context";

const CommentContainer = ({ postId, updatePost }) => {
  const [comments, setComments] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [commenting, setCommenting] = useState(false);
  const [comment, setComment] = useState("");
  const {
    state: { user },
  } = useContext(Context);

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetchData(`comments/${postId}`, "GET");
        const data = await res.json();
        setComments(data);
        setFetching(false);
      } catch (error) {
        setFetching(false);
      }
    };
    getComments();
  }, [postId]);

  const sendComment = async (details) => {
    if(commenting) return;
    setCommenting(true);
    try {
      const res = await fetchData(
        `comments/comment/${postId}`,
        "POST",
        details,
        user.token
      );

      if (res.status === 200) {
        const data = await res.json();
        setComments([...comments, data.comment]);
        updatePost(data.comment._id);
        setComment("");
      }
      setCommenting(false);
    } catch (e) {
      setCommenting(false);
      console.log(e);
    }
  };

  const handleCommenting = (e) => {
    e.preventDefault();
    if (comment.trim().length < 1) return;
    const details = {
      body: comment,
    };
    sendComment(details);
  };

  return (
    <section>
      <form onSubmit={handleCommenting} className="pb-2">
        <textarea
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          required
          rows={5}
          className="border resize-none overflow-hidden min-h-[80px] rounded outline-none pl-2 focus:border-secondary transition-colors duration-300 border-black w-full"
          placeholder="Leave your reply..."
        ></textarea>
        {user.isLogged ? (
          <button
            type="submit"
            className="block w-fit ml-auto rounded text-white relative -top-8 right-[2px]"
          >
                       <svg className={`h-6 w-6 ${comment.length && !commenting ? "fill-black" : "fill-gray-400"}`} viewBox="0 0 20 20">
              <path d="M19 16.685S16.775 6.953 8 6.953V2.969L1 9.542l7 6.69v-4.357c4.763-.001 8.516.421 11 4.81z" />
            </svg>
          </button>
        ) : (
          <p className="text-sm font-light">
            <Link href="/login">
              <a className="border-secondary border-b text-secondary mr-1">
                Log in
              </a>
            </Link>
            to add a comment
          </p>
        )}
      </form>
      <section className="rounded overflow-hidden min-h-[100px] border border-gray-100">
      <h2 className="text-sm py-3 pl-4 bg-secondary text-white">Comments</h2>
          <article className="pb-6">
      {comments.length ? (
        comments.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt)  ,0).map((comm) => {
          return <Comment comment={comm} key={comm._id} />;
        })
      ) : (
        <p className="p-2 text-xs">{fetching ? "Loading comments" : "No comments"}</p>
      )}</article>
      </section>
    </section>
  );
};

export default CommentContainer;
