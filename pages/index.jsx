import HomeCategory from "../components/HomeCategory";
import Meta from "../components/Meta";
import fetchData from "../customFunctions/fetch";
import HomeCards from "../components/HomeCard";
import { BiSearch } from "react-icons/bi";

export default function Home({ latest, featured }) {
  return (
    <div className="pb-8 w-screen">
      <Meta title="Orpah | Home" />
      <div
        className="py-16 flex items-center justify-evenly  hero relative
         "
      >
        <div className="flex flex-col items-center justify-center gap-y-12 ">
          <h2 className="text-2xl leading-8 sm:leading-[60px] lg:leading-[80px] uppercase font-sec sm:text-5xl lg:text-6xl py-4 px-4 max-w-[600px] font-medium">
            <p>Unleashing the Hero Within, Inspire, Empower, Conquer!</p>
          </h2>
          <form className="flex items-center justify-center max-w-[700px] w-full px-2">
            <input
              className="inline-block h-12 md:h-14 w-full home-input pl-4 outline-none placeholder:text-center placeholder:text-sm pl md:placeholder:text-md
            border rounded-tl-full rounded-bl-full focus:border-2 border-secondary"
              placeholder="Search for articles, tips, and inspiration"
              type="text"
            />
            <button className="p-2 md:p-3 hover:fill-white bg-secondary border-l-0 rounded-tr-full rounded-br-full">
              <BiSearch className="h-8 w-8 stroke-white hover:stroke-slate-200  stroke-[2px]" />
            </button>
          </form>
        </div>
        <div className="">
          <img
            className="w-96 hidden lg:block"
            src="./content-writer.png"
            alt=""
          />
        </div>
        {/* <div className="absolute -top-16 -left-48 -right-48 -bottom-0 -z-30 overflow-hidden hero-img">
          <img
            src="https://images.pexels.com/photos/5554667/pexels-photo-5554667.jpeg?auto=compress&cs=tinysrgb&w=1024"
            className="absolute top-0 left-0 h-full w-full object-cover"
            alt=""
          />
        </div> */}
      </div>
      <section
        className="py-8 flex justify-evenly items-s h relative 
      after:absolute after:top-8 after:left-2 after:h-16 md:after:h-24 md:after:w-24 md:before:h-24 after:w-16 after:bg-secondary
      before:absolute before:bottom-0  before:right-2 before:h-16 before:w-16 before:bg-secondary
      "
      >
        <img
          className="h-[900px] w-[400px] object-cover rounded-xl relative top-48 hidden xl:block"
          src="https://images.pexels.com/photos/5965896/pexels-photo-5965896.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
        />
        <section className="py-16 mx-12">
          <HomeCards />
        </section>
        <img
          className="h-[900px] w-[400px] md :h-[600px] md:w-[300px] object-cover rounded-xl hidden md:block"
          src="https://images.pexels.com/photos/3771127/pexels-photo-3771127.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
        />
      </section>
      <HomeCategory posts={latest} heading="Latest blogs" />
      <HomeCategory posts={featured} heading="Popular blogs" />
    </div>
  );
}

export const getServerSideProps = async () => {
  const res = await fetchData("posts/featured", "GET");

  if (res.status !== 200) {
    return {
      notFound: true,
    };
  }
  const posts = await res.json();

  return {
    props: {
      featured: posts.featured,
      latest: posts.latest,
    },
  };
};
