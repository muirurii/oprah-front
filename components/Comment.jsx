import { useContext, useState, useEffect, useRef } from "react";
import { Context } from "../context";
import fetchData from "../customFunctions/fetch";
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

  useEffect(() => {
    if (user.isLogged && likes.some((like) => like === user._id)) {
      setHasLiked(true);
    } else {
      setHasLiked(false);
    }
  }, [likes, user]);

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
      if(res.status === 200){
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
        setNewComment("");
      } else {
        throw new Error("Unable to reply");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section className="relative">
      <section
        className={`w-fit min-w-[200px] ${
          isSub ? "bg-gray-50 ml-2" : null
        } shadow shadow-gray-200 rounded-md py-1 mb-2 px-5`}
      >
        <div className="flex gap-2 items-center">
          <div className="rounded-full">
            <svg
              className="h-6 w-6"
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
          </div>
          <p className="">
            <span className="text-[10px] text-secondary">
              @{comment.user[0].username}
            </span>
            <span className="text-[8px] block">
              {new Date(comment.createdAt).toLocaleString("en-GB", {
                minute:"2-digit",
                day:"2-digit",
                month:"2-digit",
                year:"numeric",
                second:"2-digit",
                hour:"2-digit"
              })}
            </span>
          </p>
        </div>
        <p className="text-sm font-light pt-2 max-w-xs sm:max-w-sm md:max-w-md">
          {comment.body}
        </p>
        <div className="py-2 flex items-start justify-start">
          <span
            onClick={handleLikeComment}
            className="cursor-pointer text-gray-400 mr-2 leading-none text-sm inline-flex"
          >
            {!hasLiked ? (
              <svg
                className="w-4 h-4 mr-1 fill-gray-400 transition-colors duration-300"
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
          <span className="cursor-pointer text-gray-400 mr-2 leading-none text-sm pr-3 inline-flex">
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
      </section>
      <section
        className={`${
          isSub ? "ml-2" : null
        } text-xs font-lighter flex items-start justify-start gap-x-6 mb-2`}
      >
        {comment.subComments.length ? (
          <button
            onClick={() => setShowSubcomments(!showSubcomments)}
            className="border-b border-gray-100"
          >
            {!showSubcomments ? "View replies" : "Hide replies"}
          </button>
        ) : null}

        {user.isLogged ? (
          <button
            onClick={() => {
              if (!replyForm) {
                setTimeout(() => {
                  inputRef.current.focus();
                }, 100);
              }
              setReplyForm(!replyForm);
            }}
            className="border-b border-gray-100"
          >
            Reply
          </button>
        ) : null}
      </section>
      {user.isLogged && replyForm ? (
        <form onSubmit={handleReply} className="flex items-end mb-4">
          <textarea
            ref={inputRef}
            value={replyText}
            onChange={(e) => {
              setReplyText(e.target.value);
            }}
            placeholder="type a reply"
            className="w-fit h-fit border-b border-secondary resize-none outline-none overflow-hidden"
          ></textarea>
          <button type="submit" className="text-white bg-secondary p-2 rounded">
            Reply
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
