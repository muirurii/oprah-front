import { useState, useEffect } from "react";
import fetchData from "../customFunctions/fetch";
import Comment from "./Comment";
import Link from "next/link";
import { useContext } from "react";
import { Context } from "../context";

const CommentContainer = ({ postId, updatePost }) => {
  const [comments, setComments] = useState([]);
  const [fetching, setFetching] = useState(true);
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
    } catch (e) {
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
          className="border min-h-[80px] rounded outline-none pl-2 focus:border-secondary transition-colors duration-300 border-black w-full"
          placeholder="Leave your reply..."
        ></textarea>
        {user.isLogged ? (
          <button
            type="submit"
            className="inline-block rounded text-white my-2 py-2 px-3 bg-secondary"
          >
            comment
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
      <section className="shadow-sm rounded overflow-hidden min-h-[100px] shadow-gray-200">
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
