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
    if (commenting) return;
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
          className="border resize-none overflow-hidden min-h-[80px]
          rounded outline-none pl-2 pr-8
          focus:border-secondary transition-colors
          duration-300 border-black w-full"
          placeholder="Leave your reply..."
        ></textarea>
        {user.isLogged ? (
          <button
            type="submit"
            className="block w-fit ml-auto rounded text-white relative -top-8 right-[2px]"
          >
            <svg className="h-7 pb-2 w-6" viewBox="0 0 28 28">
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g
                  className={`h-6 w-6 ${
                    comment.length && !commenting
                      ? "fill-black"
                      : "fill-gray-400"
                  }`}
                  fillRule="nonzero"
                >
                  <path
                    d="M3.78963301,2.77233335 L24.8609339,12.8499121 C25.4837277,13.1477699 25.7471402,13.8941055 25.4492823,14.5168992 C25.326107,14.7744476 25.1184823,14.9820723 24.8609339,15.1052476 L3.78963301,25.1828263 C3.16683929,25.4806842 2.42050372,25.2172716 2.12264586,24.5944779 C1.99321184,24.3238431 1.96542524,24.015685 2.04435886,23.7262618 L4.15190935,15.9983421 C4.204709,15.8047375 4.36814355,15.6614577 4.56699265,15.634447 L14.7775879,14.2474874 C14.8655834,14.2349166 14.938494,14.177091 14.9721837,14.0981464 L14.9897199,14.0353553 C15.0064567,13.9181981 14.9390703,13.8084248 14.8334007,13.7671556 L14.7775879,13.7525126 L4.57894108,12.3655968 C4.38011873,12.3385589 4.21671819,12.1952832 4.16392965,12.0016992 L2.04435886,4.22889788 C1.8627142,3.56286745 2.25538645,2.87569101 2.92141688,2.69404635 C3.21084015,2.61511273 3.51899823,2.64289932 3.78963301,2.77233335 Z"
                  />
                </g>
              </g>
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
            comments
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt), 0)
              .map((comm) => {
                return <Comment comment={comm} key={comm._id} />;
              })
          ) : (
            <p className="p-2 text-xs">
              {fetching ? "Loading comments" : "No comments"}
            </p>
          )}
        </article>
      </section>
    </section>
  );
};

export default CommentContainer;
