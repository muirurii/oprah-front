import fetchData from "../customFunctions/fetch";
import PostsContainer from "../components/PostsContainer";
import Meta from "../components/Meta";
import { useState, useEffect, useRef } from "react";
import Heading from "../components/Heading";

let onInputTimeout;

const sorts = {
  latest: {
    sortProp: "createdAt",
    sortValue: "descending",
  },
  oldest: {
    sortProp: "createdAt",
    sortValue: "ascending",
  },
  mostViewed: {
    sortProp: "views",
    sortValue: "descending",
  },
  leastViewed: {
    sortProp: "views",
    sortValue: "ascending",
  },
  mostLiked: {
    sortProp: "views",
    sortValue: "descending",
  },
  leastLiked: {
    sortProp: "views",
    sortValue: "ascending",
  },
};

const Blogs = ({ posts: initialPosts }) => {
  const [posts, setPosts] = useState(initialPosts);
  const [sorting, setSorting] = useState(false);
  const [searching, setSearching] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showRecent, setShowRecent] = useState(false);
  const searchInput = useRef();
  const [recentSearch, setRecentSearch] = useState(
    JSON.parse(localStorage.getItem("searches")) || []
  );

  const handleSort = async (e) => {
    e.preventDefault();
    if (sorting) return;
    setSorting(true);
    const { sortProp, sortValue } = sorts[sort];

    try {
      const res = await fetchData(
        `posts?sortProp=${sortProp}&sortValue=${sortValue}`
      );
      const data = await res.json();
      if (res.status === 200) {
        setPosts(data.posts);
      }
      setShowSortMenu(false);
      setSorting(false);
    } catch (error) {
      setSorting(false);
      setShowSortMenu(false);
    }
  };

  const updateSort = (e) => {
    setSort(e.target.value);
  };

  const handleSearch = async (search) => {
    if (searching) return;
    setSearching(true);

    const { sortProp, sortValue } = sorts[sort];
    handleUpdateSearches(search);
    try {
      const res = await fetchData(
        `posts?sortProp=${sortProp}&sortValue=${sortValue}&search=${search}`
      );
      const data = await res.json();
      if (res.status === 200) {
        setPosts(data.posts);
      }
      setSearching(false);
    } catch (error) {
      setSearching(false);
      console.log(error.message);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleSearch(search);
  };

  const handleSearchInput = (e) => {
    clearTimeout(onInputTimeout);
    setSearch(e.target.value);
    onInputTimeout = setTimeout(() => {
      handleSearch(e.target.value);
    }, 1000);
  };

  const handleFromRecent = (e) => {
    setSearch(e.target.innerHTML);
    handleSearch(e.target.innerHTML);
  };

  const handleUpdateSearches = (search) => {
    if (!search.length) return;
    const update = [
      search,
      ...recentSearch.filter((s) => s !== search).splice(0, 3),
    ];
    setNewRecent(update);
  };

  const setNewRecent = (update) => {
    setRecentSearch(update);
    localStorage.setItem("searches", JSON.stringify(update));
  };

  const removeRecent = (id) => {
    const update = recentSearch.filter((s, i) => id !== i);
    setNewRecent(update);
  };

  return (
    <main>
      <Meta title="Blogs" />
      <Heading text={"blogs"} />
      <section className="mt-4 mb-16 flex items-center justify-center px-4 gap-x-2">
        <p
          onClick={() => setShowSortMenu(!showSortMenu)}
          className="hidden sm:block pr-4 hover:bg-slate-200 px-4 py-3 rounded-sm cursor-pointer"
        >
          Sort Blogs
        </p>
        <section className="relative">
          <button
            onClick={() => setShowSortMenu(!showSortMenu)}
            className="bg-black text-white h-12 w-12 flex items-center justify-center mb-1 rounded"
          >
            <svg
              className="h-7 w-7"
              viewBox="0 0 24 24"
              aria-labelledby="sortUpIconTitle"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              color="#fff"
            >
              <title>Sort blogs</title>
              <path d="M11 16H17" /> <path d="M11 20H19" />
              <path d="M11 12H15" /> <path d="M4 8L7 5L10 8" />
              <path d="M7 20L7 6" />
            </svg>
          </button>
          {showSortMenu && (
            <section className="absolute top-full z-[3] -left-4 w-screen sm:w-[400px] pb-4 bg-white shadow-sm shadow-gray-400 rounded overflow-hidden">
              <h3 className="p-4 mb-2 text-center bg-secondary text-white">
                Sort blogs by
              </h3>
              <form className="pl-4" onSubmit={handleSort}>
                <div>
                  <p className="pl-2">Time posted</p>
                  <div className="py-2 pl-3">
                    <fieldset className="p-1 flex items-center justify-start gap-x-3">
                      <input
                        onChange={updateSort}
                        value="latest"
                        className="accent-secondary"
                        type="radio"
                        name="sort"
                        id="latest"
                        checked={sort === "latest"}
                      />
                      <label htmlFor="latest" className="font-lighter">
                        Latest first
                      </label>
                    </fieldset>
                    <fieldset className="p-1 flex items-center justify-start gap-x-2">
                      <input
                        onChange={updateSort}
                        value="oldest"
                        className="accent-secondary"
                        type="radio"
                        name="sort"
                        id="old"
                        checked={sort === "oldest"}
                      />
                      <label htmlFor="old" className="font-lighter">
                        Old blogs first
                      </label>
                    </fieldset>
                  </div>
                </div>
                <div className="pl-0">
                  <p className=" border-t border-gray-200 pt-1 pl-2">Views</p>
                  <div className="py-2 pl-3">
                    <fieldset className="p-1 flex items-center justify-start gap-x-2">
                      <input
                        onChange={updateSort}
                        value="mostViewed"
                        className="accent-secondary"
                        type="radio"
                        name="sort"
                        id="mostViewed"
                        checked={sort === "mostViewed"}
                      />
                      <label htmlFor="mostViewed" className="font-lighter">
                        Most viewed first
                      </label>
                    </fieldset>
                    <fieldset className="p-1 flex items-center justify-start gap-x-2">
                      <input
                        onChange={updateSort}
                        value="leastViewed"
                        className="accent-secondary"
                        type="radio"
                        name="sort"
                        id="leastViewed"
                        checked={sort === "leastViewed"}
                      />
                      <label htmlFor="leastViewed" className="font-lighter">
                        Least viewed first
                      </label>
                    </fieldset>
                  </div>
                </div>
                <div className="pl-0">
                  <p className=" border-t border-gray-200 pt-1 pl-2">Likes</p>
                  <div className="py-2 pl-3">
                    <fieldset className="p-1 flex items-center justify-start gap-x-2">
                      <input
                        onChange={updateSort}
                        value="mostLiked"
                        className="accent-secondary"
                        type="radio"
                        name="sort"
                        id="mostLiked"
                        checked={sort === "mostLiked"}
                      />
                      <label htmlFor="mostLiked" className="font-lighter">
                        Most liked first
                      </label>
                    </fieldset>
                    <fieldset className="p-1 flex items-center justify-start gap-x-2">
                      <input
                        onChange={updateSort}
                        value="leastLiked"
                        className="accent-secondary"
                        type="radio"
                        name="sort"
                        id="leastLiked"
                        checked={sort === "leastLiked"}
                      />
                      <label htmlFor="leastLiked" className="font-lighter">
                        Least liked first
                      </label>
                    </fieldset>
                  </div>
                </div>
                <div className="flex m-2 items-center justify-between">
                  <button
                    type="submit"
                    className={`
                      ${sorting ? "bg-red-300" : "bg-secondary"}
                    text-white py-3 sm:py-4 px-7 sm:px-8 inline-block mt-2
                      rounded 
                       transition-all duration-300 border hover:bg-white hover:text-black border-secondary
                      `}
                  >
                    {sorting ? "Applying changes..." : "Apply changes"}
                  </button>
                </div>
              </form>
            </section>
          )}
        </section>
        <form
          onSubmit={handleSearchSubmit}
          onFocus={() => setShowSortMenu(false)}
          className="flex w-full max-w-[1200px] mx-4 items-center justify-center relative"
        >
          <input
            className="h-12 transition-all duration-300
            w-full
            border border-r-0 border-secondary
            rounded-bl rounded-tl outline-none
            pl-4 peer focus:border-2 focus:border-r-0"
            type="text"
            placeholder="search blogs"
            value={search}
            onChange={handleSearchInput}
            ref={searchInput}
            onFocus={() => setShowRecent(true)}
            onBlur={() => {
              setTimeout(() => {
                setShowRecent(false);
              }, 300);
            }}
          />
          <button
            className="border transition-all duration-300 peer-focus:border-2 peer-focus:border-l-0 border-l-0
             border-secondary rounded-tr rounded-br h-12 px-2 flex items-center justify-center"
            type="submit"
            onClick={() => searchInput.current.focus()}
            onFocus={() => searchInput.current.focus()}
          >
            {searching ? (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-secondary border-r-secondary border-3"></div>
            ) : (
              <svg
                className="h-5 w-5"
                x="0px"
                y="0px"
                viewBox="0 0 487.95 487.95"
                style={{ enableBackground: "new 0 0 487.95 487.95" }}
                xmlSpace="preserve"
              >
                <g>
                  <g>
                    <path d="M481.8,453l-140-140.1c27.6-33.1,44.2-75.4,44.2-121.6C386,85.9,299.5,0.2,193.1,0.2S0,86,0,191.4s86.5,191.1,192.9,191.1    c45.2,0,86.8-15.5,119.8-41.4l140.5,140.5c8.2,8.2,20.4,8.2,28.6,0C490,473.4,490,461.2,481.8,453z M41,191.4    c0-82.8,68.2-150.1,151.9-150.1s151.9,67.3,151.9,150.1s-68.2,150.1-151.9,150.1S41,274.1,41,191.4z" />
                  </g>
                </g>
              </svg>
            )}
          </button>
          {showRecent ? (
            <div className="absolute z-[2] top-full bg-white rounded border border-gray-100 left-0 right-0 origin-top min-h-[60px] mt-1">
              <h3 className="text-center py-2">Recent searches</h3>
              <ul>
                {recentSearch.length ? (
                  recentSearch.map((s, i) => {
                    return (
                      <li
                        key={i * Math.random()}
                        className="group flex relative py-1 pl-2 cursor-pointer text-sm text-gray-600"
                      >
                        <span
                          onClick={handleFromRecent}
                          className="block mr-6 w-full mr-4 truncate hover:text-clip hover:whitespace-normal"
                        >
                          {s}
                        </span>
                        <button
                          className="hidden group-hover:block text-secondary float-right mr-2 h-full rounded-tr rounded-br"
                          onClick={() => removeRecent(i)}
                        >
                          x
                        </button>
                      </li>
                    );
                  })
                ) : (
                  <p className="py-2 text-sm text-center">No recent searches</p>
                )}
              </ul>
            </div>
          ) : null}
        </form>
      </section>
      {!posts.length && search.length ? (
        <div className="h-64 grid place-items-center">
          <p>The term {search} did not yield any result</p>
        </div>
      ) : (
        <PostsContainer posts={posts} />
      )}
    </main>
  );
};

export default Blogs;

export const getServerSideProps = async () => {
  const res = await fetchData(
    "posts?sortProp=createdAt&sortValue=descending",
    "GET"
  );
  const data = await res.json();
  return {
    props: {
      posts: data.posts,
    },
  };
};
