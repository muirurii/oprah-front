import fetchData from "../customFunctions/fetch";
import PostsContainer from "../components/PostsContainer";
import Meta from "../components/Meta";
import { useState, useEffect, useRef } from "react";

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
    setSearch(e.target.value);
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
    setNewRecent(update)
  };

  const setNewRecent = (update)=>{
    setRecentSearch(update);
    localStorage.setItem("searches", JSON.stringify(update));
  }

  const removeRecent = (id)=>{
    const update = recentSearch.filter((s,i) => id !== i);
    setNewRecent(update);
  }

  return (
    <main>
      <Meta title="Blogs" />
      <h1 className="text-3xl pt-8 pl-4">Blogs</h1>
      <section className="mt-6 flex items-start justify-center md:justify-start px-4">
        <section className="relative">
          <button
            onClick={() => setShowSortMenu(!showSortMenu)}
            className="bg-black text-white h-9 w-9 flex items-center justify-center mr-1 mb-1 rounded"
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
            <section className="absolute top-full z-[3] left-0 w-64 pb-2 bg-white shadow-sm shadow-gray-400 rounded overflow-hidden">
              <h3 className="p-2 mb-2 text-center bg-secondary text-white">
                Sort blogs by
              </h3>
              <form onSubmit={handleSort}>
                <div className="pl-0">
                  <p className="text-sm pl-2">Time posted</p>
                  <div className="py-2 pl-2">
                    <fieldset className="p-1 flex items-center justify-start gap-x-2">
                      <input
                        onChange={updateSort}
                        value="latest"
                        className="accent-secondary"
                        type="radio"
                        name="sort"
                        id="latest"
                        checked={sort === "latest"}
                      />
                      <label htmlFor="latest" className="text-xs font-lighter">
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
                      <label htmlFor="old" className="text-xs font-lighter">
                        Old blogs first
                      </label>
                    </fieldset>
                  </div>
                </div>
                <div className="pl-0">
                  <p className="text-sm border-t border-gray-200 pt-1 pl-2">
                    Views
                  </p>
                  <div className="py-2 pl-2">
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
                      <label
                        htmlFor="mostViewed"
                        className="text-xs font-lighter"
                      >
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
                      <label
                        htmlFor="leastViewed"
                        className="text-xs font-lighter"
                      >
                        Least viewed first
                      </label>
                    </fieldset>
                  </div>
                </div>
                <div className="pl-0">
                  <p className="text-sm border-t border-gray-200 pt-1 pl-2">
                    Likes
                  </p>
                  <div className="py-2 pl-2">
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
                      <label
                        htmlFor="mostLiked"
                        className="text-xs font-lighter"
                      >
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
                      <label
                        htmlFor="leastLiked"
                        className="text-xs font-lighter"
                      >
                        Least liked first
                      </label>
                    </fieldset>
                  </div>
                </div>
                <div className="flex px-2 my-2 items-center justify-between">
                  <button
                    type="submit"
                    className={`
                      ${sorting ? "bg-red-300" : "bg-secondary"}
                    text-white py-2 px-4
                      rounded 
                      text-sm transition-all duration-300 hover:opacity-70
                      `}
                  >
                    {sorting ? "Applying changes..." : "Apply changes"}
                  </button>
                  <button
                    onClick={() => setShowSortMenu(false)}
                    type="button"
                    className="transition-opacity duration-300 hover:opacity-70"
                  >
                    <svg className="fill-secondary h-6 w-6" viewBox="0 0 24 24">
                      <path d="M6.22566 4.81096C5.83514 4.42044 5.20197 4.42044 4.81145 4.81096C4.42092 5.20148 4.42092 5.83465 4.81145 6.22517L10.5862 11.9999L4.81151 17.7746C4.42098 18.1651 4.42098 18.7983 4.81151 19.1888C5.20203 19.5793 5.8352 19.5793 6.22572 19.1888L12.0004 13.4141L17.7751 19.1888C18.1656 19.5793 18.7988 19.5793 19.1893 19.1888C19.5798 18.7983 19.5798 18.1651 19.1893 17.7746L13.4146 11.9999L19.1893 6.22517C19.5799 5.83465 19.5799 5.20148 19.1893 4.81096C18.7988 4.42044 18.1657 4.42044 17.7751 4.81096L12.0004 10.5857L6.22566 4.81096Z" />
                    </svg>
                  </button>
                </div>
              </form>
            </section>
          )}
        </section>
        <form
          onSubmit={handleSearchSubmit}
          onFocus={() => setShowSortMenu(false)}
          className="flex items-center justify-center relative"
        >
          <input
            className="h-9 transition-all duration-300
            w-48
            sm:w-80
            border border-r-0 border-secondary rounded-bl rounded-tl outline-none pl-4 peer focus:border-2 focus:border-r-0"
            type="text"
            placeholder="search blogs"
            value={search}
            onChange={handleSearchInput}
            ref={searchInput}
            onFocus={()=> setShowRecent(true)}
            onBlur={()=>{
              setTimeout(() => {
                setShowRecent(false)                
              }, 300);
            }}
          />
          <button
            className="border transition-all duration-300 peer-focus:border-2 peer-focus:border-l-0 border-l-0 border-secondary rounded-tr rounded-br h-9 px-1 flex items-center justify-center"
            type="submit"
            onClick={() => searchInput.current.focus()}
            onFocus={() => searchInput.current.focus()}
          >
            {searching ? <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-secondary border-r-secondary border-3"></div> : <svg
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
            </svg>}
          </button>
         {showRecent ? <div className="absolute z-[2] top-full bg-white rounded border border-gray-200 left-0 right-0 origin-top min-h-[60px] mt-1">
            <h3 className="text-center py-2">Recent searches</h3>
            <ul>
              {recentSearch.length ? (
                recentSearch.map((s, i) => {
                  return (
                    <li
                      key={i * Math.round(Math.random() * 234)}
                      className="group flex relative py-1 px-2 cursor-pointer text-sm text-gray-600 hover:bg-gray-100"
                    >
                      <span
                        onClick={handleFromRecent}
                        className="block w-full mr-4 truncate hover:text-clip hover:whitespace-normal"
                      >{s}</span>
                      <button
                        className="hidden absolute left-full top-0 p-1 h-full border-l border-gray-200 bg-gray-100 group-hover:block text-secondary rounded-tr rounded-br"
                        onClick={()=> removeRecent(i)}
                      >x</button>
                    </li>
                  );
                })
              ) : (
                <p className="py-2 text-sm text-center">No recent searches</p>
              )}
            </ul>
          </div> : null }
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
