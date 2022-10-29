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
    <section className="w-full px-2">
      <section className="border border-gray-100">
        <div
          className={`flex relative after:absolute after:h-[1px] after:left-0 ${
            tab === "likes" ? "" : "after:translate-x-full"
          } after:transition-all after:duration-300 after:bottom-0 after:w-1/2 after:bg-secondary`}
        >
          <h1
            onClick={() => setTab("likes")}
            className={`py-2 text-md hover:bg-gray-50 cursor-pointer text-center w-1/2 border-b border-gray-100`}
          >
            Liked Posts ({likes.length})
          </h1>
          <h1
            onClick={() => setTab("bookmarks")}
            className={`py-2 text-md hover:bg-gray-50 cursor-pointer text-center w-1/2 border-b border-gray-100`}
          >
            Bookmarks ({bookmarks.length})
          </h1>
        </div>
        {tab === "likes" ? (
          <article className="flex flex-col min-h-[100px] items-start justify-center">
            {likes.length ? (
              likes.map((p) => <MoreCard post={p} key={p._id} />)
            ) : (
              <p className="text-sm text-gray-500 text-center w-full">
                You have not liked any post
              </p>
            )}
          </article>
        ) : null}
        {tab === "bookmarks" ? (
          <article className="flex flex-col min-h-[100px] items-start justify-center">
            {bookmarks.length ? (
              bookmarks.map((p) => <MoreCard post={p} key={p._id} />)
            ) : (
              <p className="text-sm text-gray-500 text-center w-full">
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
