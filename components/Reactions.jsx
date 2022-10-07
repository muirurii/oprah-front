import { useState, useContext, useEffect } from "react";
import { Context } from "../context";
import { addBookMark, removeBookMark } from "../context/actions/userActions";
import fetchData from "../customFunctions/fetch";

const Reactions = ({ post }) => {
  const [hasLiked, setHasLiked] = useState(false);
  const [hasBookMarked, setHasBookMarked] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [likes, setLikes] = useState(post.likes);

  const {
    state: { user },
    dispatch,
  } = useContext(Context);

  useEffect(() => {
    if (user.isLogged && likes.some((like) => like === user._id)) {
      setHasLiked(true);
    } else {
      setHasLiked(false);
    }
  }, [likes, user]);

  useEffect(() => {
    if (
      user.isLogged &&
      user.bookmarks.some((bookmarked) => bookmarked === post._id)
    ) {
      setHasBookMarked(true);
    } else {
      setHasBookMarked(false);
    }
  }, [post, user]);

  const handleReaction = async () => {
    if (!user.isLogged) return;
    if (isFetching) return;
    setIsFetching(true);
    try {
      const res = await fetchData(
        `reaction/react/${post.slug}`,
        "POST",
        {},
        user.token
      );
      if (res.status == 200) {
        const data = await res.json();
        setIsFetching(false);
        setLikes(data.likes);
      }
    } catch (err) {
      setIsFetching(false);
      return err;
    }
  };

  const handleBookmarking = async () => {
    if (!user.isLogged) return;
    if (isFetching) return;
    setIsFetching(true);
    try {
      const res = await fetchData(
        `reaction/bookmark/${post.slug}`,
        "POST",
        {},
        user.token
      );
      if (res.status == 200) {
        const data = await res.json();
        if (!hasBookMarked) {
          addBookMark(dispatch, data.id);
          setIsFetching(false);
        } else {
          removeBookMark(dispatch, data.id);
          setIsFetching(false);
        }
      }
    } catch (err) {
      setIsFetching(false);
      return err;
    }
  };

  return (
    <div className="flex items-center justify-center gap-x-2">
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
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
        {post.views}
      </span>
      <span
        onClick={handleReaction}
        className="text-gray-400 inline-flex items-center leading-none text-sm cursor-pointer"
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
          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
        </svg>
        {post.comments.length}
      </span>
      <span
        onClick={handleBookmarking}
        className="text-gray-400 inline-flex items-center  cursor-pointer leading-none text-sm"
      >
        {!hasBookMarked ? (
          <svg
            className="w-4 h-4 mr-1"
            strokeWidth="2px"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
            <path d="M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4z" />
          </svg>
        ) : (
          <svg className="w-4 h-4 mr-1 fill-secondary" viewBox="0 0 52 52">
            <path d="M46,2H6A3.2,3.2,0,0,0,2.82,5.18V46.82a3.19,3.19,0,0,0,4.87,2.7L26,38.11,44.31,49.52a3.19,3.19,0,0,0,4.87-2.7V5.18A3.2,3.2,0,0,0,46,2ZM39,17.49,31.53,23l2.85,8.81a.57.57,0,0,1-.35.72.54.54,0,0,1-.52-.07L26,27l-7.51,5.46a.58.58,0,0,1-.8-.13.6.6,0,0,1-.07-.52L20.47,23,13,17.49a.58.58,0,0,1,0-.82.55.55,0,0,1,.38-.18h9.25L25.5,7.67a.56.56,0,0,1,.69-.39.55.55,0,0,1,.39.39l2.89,8.82h9.25a.58.58,0,0,1,.46.68A.57.57,0,0,1,39,17.49Z" />
          </svg>
        )}
      </span>
    </div>
  );
};

export default Reactions;
