import { useContext, useEffect, useState } from "react";
import { Context } from "../context";
import fetchData from "../customFunctions/fetch";
import MoreCard from "./MoreCard";

const UserPosts = () => {
  const [likes, setLikes] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [tab, setTab] = useState("likes");
  const {
    state: { user },
  } = useContext(Context);
  useEffect(() => {
    if (!user.isLogged) return;
    const getLiked = async () => {
      try {
        const res = await fetchData("users/user/liked", "GET", {}, user.token);
        if (res.status === 200) {
          const data = await res.json();
          setLikes(data.likes);
          setBookmarks(data.bookmarks);
        } else {
          throw new Error("unable to fetch");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getLiked();
  }, []);

  return (
    <section>
      <section className="shadow-sm shadow-gray-200">
        <div className="flex">
          <h1
            onClick={() => setTab("likes")}
            className={`py-2 text-md hover:bg-gray-50 cursor-pointer text-center w-1/2 border-b ${
              tab === "likes" ? "border-secondary" : "border-gray-100"
            }`}
          >
            Liked Posts
          </h1>
          <h1
            onClick={() => setTab("bookmarks")}
            className={`py-2 text-md hover:bg-gray-50 cursor-pointer text-center w-1/2 border-b ${
              tab === "bookmarks" ? "border-secondary" : "border-gray-100"
            }`}
          >
            Bookmarks
          </h1>
        </div>
        {tab === "likes" ? (
          <article className="flex flex-col min-h-[100px] flex items-center justify-center">
            {likes.length ? (
              likes.map((p) => <MoreCard post={p} key={p._id} />)
            ) : (
              <p className="text-sm text-gray-500">
                You have not liked any post
              </p>
            )}
          </article>
        ) : null}
        {tab === "bookmarks" ? (
          <article className="flex flex-col min-h-[200px] flex items-center justify-center">
            {bookmarks.length ? (
              bookmarks.map((p) => <MoreCard post={p} key={p._id} />)
            ) : (
              <p className="text-sm text-gray-500">
                You have not bookmarked any post
              </p>
            )}
          </article>
        ) : null}
      </section>
    </section>
  );
};

export default UserPosts;
