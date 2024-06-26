import { useContext, useState, useEffect, useRef } from "react";
import { Context } from "../context";
import fetchData from "../customFunctions/fetch";
import useRelativeTime from "../customFunctions/useRelativeTime";
import SubCommentContainer from "./SubCommentContainer";

const Comment = ({ comment: initialComment, isSub }) => {
  const {
    state: { user },
  } = useContext(Context);

  const [comment, setComment] = useState(initialComment);
  const [likes, setLikes] = useState(comment.likes);
  const [hasLiked, setHasLiked] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [showSubcomments, setShowSubcomments] = useState(false);
  const [replyForm, setReplyForm] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [newComment, setNewComment] = useState({});
  const inputRef = useRef();
  const relativeTime = useRelativeTime(comment.createdAt);

  useEffect(() => {
    if (user.isLogged && likes.some((like) => like === user._id)) {
      setHasLiked(true);
    } else {
      setHasLiked(false);
    }
  }, [likes, user.isLogged, user._id]);

  const handleLikeComment = async () => {
    if (!user.isLogged) return;
    if (fetching) return;
    setFetching(true);
    try {
      const res = await fetchData(
        `reaction/comment/react/${comment._id}`,
        "POST",
        {},
        user.token
      );
      const data = await res.json();
      if (res.status === 200) {
        setLikes(data.likes);
      }
      setFetching(false);
    } catch (error) {
      console.log(error);
      setFetching(false);
    }
  };

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyText.length) return;
    if (fetching) return;
    setFetching(true);
    try {
      const res = await fetchData(
        `comments/subcomment/${comment._id}`,
        "POST",
        { body: replyText },
        user.token
      );
      const data = await res.json();
      if (res.status === 200) {
        setNewComment(data);
        setComment({
          ...comment,
          subComments: [...comment.subComments, data._id],
        });
        setReplyText("");
        setReplyForm(false);
        setShowSubcomments(true);
        setFetching(false);
        setTimeout(() => {
          setNewComment("");
        }, 500);
      } else {
        throw new Error("Unable to reply");
      }
    } catch (error) {
      setFetching(false);
      console.log(error.message);
    }
  };

  return (
    <section
      className={`
    relative py-4 ${
      !isSub && comment.subComments.length && showSubcomments
        ? "relative after:absolute after:left-2 after:top-16 after:bottom-4 last:bottom-0 after:w-[2px] after:bg-gray-200"
        : null
    }
    ${
      !isSub ? "px-2 last:pb-0 border-b border-gray-100 last:border-none" : null
    }
    ${isSub && comment.subComments.length && showSubcomments ? "pb-0" : null}
    `}
    >
      <section className={`w-full max-w-[600px] rounded mb-2`}>
        <article className="flex gap-2 items-center pl-2">
          <>
            {!comment.user.profilePic.length ? (
              <svg
                className="h-7 w-7"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
                style={{ enableBackground: "new 0 0 512 512" }}
                xmlSpace="preserve"
              >
                <g>
                  <g>
                    <path d="M256,0C114.608,0,0,114.608,0,256s114.608,256,256,256s256-114.608,256-256S397.392,0,256,0z M256,496    C123.664,496,16,388.336,16,256S123.664,16,256,16s240,107.664,240,240S388.336,496,256,496z" />
                  </g>
                </g>
                <g>
                  <g>
                    <path d="M257.408,106.256c-32.704,0-59.296,26.608-59.296,59.312s26.592,59.296,59.296,59.296    c32.704,0,59.312-26.592,59.312-59.296C316.72,132.864,290.112,106.256,257.408,106.256z M257.408,208.864    c-23.872,0-43.296-19.424-43.296-43.296s19.424-43.312,43.296-43.312s43.312,19.44,43.312,43.312S281.28,208.864,257.408,208.864z    " />
                  </g>
                </g>
                <g>
                  <g>
                    <path d="M314.112,252.256l-56.704,42.752l-56.704-42.752c-69.792,20.944-68.912,91.6-68.912,91.6h125.616h125.616    C383.024,343.856,383.904,273.2,314.112,252.256z M257.392,327.84H149.824c3.888-17.408,15.2-44.688,48.048-57.68l49.904,37.616    c2.848,2.144,6.24,3.216,9.632,3.216c3.392,0,6.784-1.072,9.632-3.216l49.904-37.632c33.008,13.024,44.256,40.272,48.096,57.696    H257.392z" />
                  </g>
                </g>
              </svg>
            ) : (
              <img
                src={comment.user.profilePic}
                alt={comment.user.username}
                className="rounded-full h-12 w-12"
              />
            )}
          </>
          <p className="text-sm">
            <span className="text-secondary">@{comment.user.username}</span>
            <span className="block">{relativeTime}</span>
          </p>
        </article>
        <article className={`${isSub ? "pl-16" : "pl-16"}`}>
          <p className="pt-2 break-all  w-full max-w-md">{comment.body}</p>
          <div className="pt-3 flex items-start justify-start">
            <span
              onClick={handleLikeComment}
              className="cursor-pointer  mr-2 leading-none text-xs inline-flex items-center"
            >
              {!hasLiked ? (
                <svg
                  className="w-4 h-4 mr-1 fill-black transition-colors duration-300"
                  x="0px"
                  y="0px"
                  viewBox="0 0 485.3 485.3"
                  style={{ enableBackground: "new 0 0 485.3 485.3" }}
                  xmlSpace="preserve"
                >
                  <g>
                    <g>
                      <g>
                        <path d="M349.6,28.95c-36.3,0-70.5,14.2-96.2,39.9l-10.6,10.6L232,68.65c-25.7-25.7-59.9-39.9-96.2-39.9     c-36.2,0-70.3,14.1-96,39.8S0,128.35,0,164.65s14.2,70.4,39.9,96.1l190.5,190.5l0.4,0.4c3.3,3.3,7.7,4.9,12,4.9     c4.4,0,8.8-1.7,12.1-5l190.5-190.5c25.7-25.7,39.9-59.8,39.9-96.1s-14.1-70.5-39.8-96.1C419.9,43.05,385.8,28.95,349.6,28.95z      M421.2,236.75l-178.3,178.4L64.2,236.45c-19.2-19.2-29.8-44.7-29.9-71.9c0-27.1,10.5-52.6,29.7-71.8     c19.2-19.1,44.7-29.7,71.7-29.7c27.2,0,52.7,10.6,72,29.9l22.9,22.9c6.4,6.4,17.8,6.4,24.3,0l22.8-22.8     c19.2-19.2,44.8-29.8,71.9-29.8s52.6,10.6,71.8,29.8c19.2,19.2,29.8,44.7,29.7,71.9C451.1,192.05,440.5,217.55,421.2,236.75z" />
                      </g>
                    </g>
                  </g>
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 mr-1 transition-colors duration-300 fill-secondary"
                  id="Capa_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 544.582 544.582"
                  style={{ enableBackground: "new 0 0 485.3 485.3" }}
                  xmlSpace="preserve"
                >
                  <g>
                    <path d="M448.069,57.839c-72.675-23.562-150.781,15.759-175.721,87.898C247.41,73.522,169.303,34.277,96.628,57.839   C23.111,81.784-16.975,160.885,6.894,234.708c22.95,70.38,235.773,258.876,263.006,258.876   c27.234,0,244.801-188.267,267.751-258.876C561.595,160.732,521.509,81.631,448.069,57.839z" />
                  </g>
                </svg>
              )}
              {likes.length}
            </span>
            <span className="cursor-pointer  mr-2 leading-none text-xs inline-flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
              </svg>
              {comment.subComments.length}
            </span>
          </div>
        </article>
      </section>
      <section
        className={`${
          isSub ? "ml-12" : "ml-11"
        } text-sm pl-5 font-lighter flex items-start justify-start gap-x-6`}
      >
        {comment.subComments.length ? (
          <button
            onClick={() => setShowSubcomments(!showSubcomments)}
            className="hover:text-secondary"
          >
            {!showSubcomments ? "view replies" : "hide replies"}
          </button>
        ) : null}

        {user.isLogged ? (
          <button
            onClick={() => {
              if (!replyForm) {
                setTimeout(() => {
                  inputRef.current.focus();
                }, 10);
              }
              setReplyForm(!replyForm);
            }}
            className="hover:text-secondary"
          >
            {replyForm ? "cancel" : "reply"}
          </button>
        ) : null}
      </section>
      {user.isLogged && replyForm ? (
        <form
          onSubmit={handleReply}
          className={`${
            isSub ? "ml-12" : "ml-11"
          } flex w-full max-w-[200px] items-end my-2 border-b relative`}
        >
          <textarea
            ref={inputRef}
            value={replyText}
            onChange={(e) => {
              setReplyText(e.target.value);
            }}
            placeholder="type a reply"
            className="w-full bg-transparent h-auto resize-none pr-6 border-b border-black focus:border-secondary outline-none overflow-hidden"
          ></textarea>
          <button
            type="submit"
            className="rounded absolute top-1/2 -translate-y-1/2 right-0 bg-transparent"
          >
            <svg className="h-7 pb-2 w-6" viewBox="0 0 28 28">
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g
                  className={`${
                    replyText.length && !fetching
                      ? "fill-black"
                      : "fill-gray-400"
                  }`}
                  fillRule="nonzero"
                >
                  <path d="M3.78963301,2.77233335 L24.8609339,12.8499121 C25.4837277,13.1477699 25.7471402,13.8941055 25.4492823,14.5168992 C25.326107,14.7744476 25.1184823,14.9820723 24.8609339,15.1052476 L3.78963301,25.1828263 C3.16683929,25.4806842 2.42050372,25.2172716 2.12264586,24.5944779 C1.99321184,24.3238431 1.96542524,24.015685 2.04435886,23.7262618 L4.15190935,15.9983421 C4.204709,15.8047375 4.36814355,15.6614577 4.56699265,15.634447 L14.7775879,14.2474874 C14.8655834,14.2349166 14.938494,14.177091 14.9721837,14.0981464 L14.9897199,14.0353553 C15.0064567,13.9181981 14.9390703,13.8084248 14.8334007,13.7671556 L14.7775879,13.7525126 L4.57894108,12.3655968 C4.38011873,12.3385589 4.21671819,12.1952832 4.16392965,12.0016992 L2.04435886,4.22889788 C1.8627142,3.56286745 2.25538645,2.87569101 2.92141688,2.69404635 C3.21084015,2.61511273 3.51899823,2.64289932 3.78963301,2.77233335 Z" />
                </g>
              </g>
            </svg>
          </button>
        </form>
      ) : null}
      {showSubcomments ? (
        <SubCommentContainer
          newComment={newComment}
          commentId={initialComment._id}
        />
      ) : null}
    </section>
  );
};

export default Comment;
