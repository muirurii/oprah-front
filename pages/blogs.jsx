import fetchData from "../customFunctions/fetch";
import PostsContainer from "../components/PostsContainer";
import Meta from "../components/Meta";
import { useState, useEffect } from "react";

const filters = {
    latest:{
        filterProp:"createdAt",
        filterValue:"descending"
    },
    oldest:{
        filterProp:"createdAt",
        filterValue:"ascending"
    },
    mostViewed:{
        filterProp:"views",
        filterValue:"descending"
    },
    leastViewed:{
        filterProp:"views",
        filterValue:"ascending"
    },
    mostLiked:{
        filterProp:"views",
        filterValue:"descending"
    },
    leastLiked:{
        filterProp:"views",
        filterValue:"ascending"
    }
}

const Blogs = ({ posts:initialPosts }) => {
  const [recentSearches, setRecentSearches] = useState([]);
  const [filter,setFilter] = useState("latest");
  const [posts,setPosts] = useState(initialPosts);
  const [showFilterMenu,setShowFilterMenu] = useState(false);

  useEffect(() => {
    // localStorage.setItem("orpah-search", JSON.stringify(["test"]));
    // const savedSearches = localStorage.getItem("orpah-search");
    // console.log(JSON.parse(savedSearches));
  }, []);

  useEffect(()=>{
},[]);

const handleFilter = async (e)=>{
    e.preventDefault();
    const {filterProp,filterValue} = filters[filter];
    try {
        const res = await fetchData(`posts?filterProp=${filterProp}&filterValue=${filterValue}`)
        const data = await res.json();
      if(res.status === 200){
          setPosts(data)
      }
    } catch (error) {
        
    }
}

  const updateFilter = (e)=>{
    setFilter(e.target.value);
  }

  return (
    <main>
      <Meta title="Blogs" />
      <h1 className="text-3xl pt-8 pl-4">Blogs</h1>
      <section className="bg-red-00 mt-4 flex items-start justify-end px-4">
        <section className="relative">
          <button onClick={()=> setShowFilterMenu(!showFilterMenu)} className="bg-black text-white p-2 mr-4 mb-1 rounded">Sort</button>
          {showFilterMenu && <section className="absolute top-full left-0 w-64 pb-2 bg-white shadow-sm shadow-gray-400 rounded overflow-hidden">
            <h3 className="p-2 mb-2 text-center bg-secondary text-white">Sort blogs by</h3>
            <form onSubmit={handleFilter}>
              <div className="pl-0">
                <p className="text-sm pl-2">Time posted</p>
                <div className="py-2 pl-2">
                  <fieldset className="p-1 flex items-center justify-start gap-x-2">
                    <input onChange={updateFilter} value="latest" className="accent-secondary" type="radio" name="filter" id="" />
                    <label className="text-xs font-lighter">Latest first</label>
                  </fieldset>
                  <fieldset className="p-1 flex items-center justify-start gap-x-2">
                    <input onChange={updateFilter} value="oldest" className="accent-secondary" type="radio" name="filter" id="" />
                    <label className="text-xs font-lighter">Old blogs first</label>
                  </fieldset>
                </div>
              </div>
              <div className="pl-0">
                <p className="text-sm border-t border-gray-200 pt-1 pl-2">Views</p>
                <div className="py-2 pl-2">
                  <fieldset className="p-1 flex items-center justify-start gap-x-2">
                    <input onChange={updateFilter} value="mostViewed" className="accent-secondary" type="radio" name="filter" id="" />
                    <label className="text-xs font-lighter">Most viewed first</label>
                  </fieldset>
                  <fieldset className="p-1 flex items-center justify-start gap-x-2">
                    <input onChange={updateFilter} value="leastViewed" className="accent-secondary" type="radio" name="filter" id="" />
                    <label className="text-xs font-lighter">Least viewed first</label>
                  </fieldset>
                </div>
              </div>
              <div className="pl-0">
                <p className="text-sm border-t border-gray-200 pt-1 pl-2">Likes</p>
                <div className="py-2 pl-2">
                  <fieldset className="p-1 flex items-center justify-start gap-x-2">
                    <input onChange={updateFilter} value="mostLiked" className="accent-secondary" type="radio" name="filter" id="" />
                    <label className="text-xs font-lighter">Most liked first</label>
                  </fieldset>
                  <fieldset className="p-1 flex items-center justify-start gap-x-2">
                    <input onChange={updateFilter} value="leastLiked" className="accent-secondary" type="radio" name="filter" id="" />
                    <label className="text-xs font-lighter">Least liked first</label>
                  </fieldset>
                </div>
              </div>
              <div className="flex px-2 my-2 items-center justify-between">
              <button type="submit" className="bg-secondary text-white py-2 px-4 rounded text-sm transition-opacity duration-300 hover:opacity-70">
                Apply filters
            </button>
              <button onClick={()=> setShowFilterMenu(false)} type="button" className="transition-opacity duration-300 hover:opacity-70">
              <svg className="fill-secondary h-6 w-6" viewBox="0 0 24 24">
                <path d="M6.22566 4.81096C5.83514 4.42044 5.20197 4.42044 4.81145 4.81096C4.42092 5.20148 4.42092 5.83465 4.81145 6.22517L10.5862 11.9999L4.81151 17.7746C4.42098 18.1651 4.42098 18.7983 4.81151 19.1888C5.20203 19.5793 5.8352 19.5793 6.22572 19.1888L12.0004 13.4141L17.7751 19.1888C18.1656 19.5793 18.7988 19.5793 19.1893 19.1888C19.5798 18.7983 19.5798 18.1651 19.1893 17.7746L13.4146 11.9999L19.1893 6.22517C19.5799 5.83465 19.5799 5.20148 19.1893 4.81096C18.7988 4.42044 18.1657 4.42044 17.7751 4.81096L12.0004 10.5857L6.22566 4.81096Z" />
                </svg>
            </button>
            </div>
            </form>
          </section>}
        </section>
        <form className="bg-red-400 relative">
          <input
            className="h-9 w-64 rounded-full border border-black focus:border-secondary outline-none pl-4 placeholder:pl-"
            type="text"
            placeholder="search blogs"
          />
          {/* <div className="absolute top-full bg-gray-100 left-0 right-0 h-64">d</div> */}
        </form>
      </section>
      <PostsContainer posts={posts} />
    </main>
  );
};

export default Blogs;

export const getServerSideProps = async () => {
  const res = await fetchData("posts?filterProp=createdAt&filterValue=descending", "GET");
  const posts = await res.json();
  return {
    props: {
      posts,
    },
  };
};
