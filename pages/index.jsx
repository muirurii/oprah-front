import { BiSearch, BiSearchAlt, BiSearchAlt2 } from "react-icons/bi";
import HomeCategory from "../components/HomeCategory";
import HomeCatLink from "../components/HomeCatLink";
import Meta from "../components/Meta";
import fetchData from "../customFunctions/fetch";

const sections = [
  {
    heading: "Explore Diverse Topics",
    content:
      "Dive into a world of diverse topics, from technology trends to creative writing tips.",
  },
  {
    heading: "Engage with Expert Insights",
    content:
      "Gain valuable insights from industry experts and thought leaders in every field.",
  },
  {
    heading: "Stay Updated and Informed",
    content:
      "Stay updated with the latest news, trends, and insights shaping our world today.",
  },
  {
    heading: "Join Our Community",
    content:
      "Join a vibrant community of like-minded individuals passionate about learning and growth.",
  },
  {
    heading: "Start Your Journey",
    content:
      "Start your journey of discovery, learning, and empowerment with us today!",
  },
];

export default function Home({ latest, featured }) {
  return (
    <div className="py-8 w-screen">
      <Meta title="Orpah | Home" />
      <div className=" min-h-scren pt-16 gap-y-12 flex flex-col items-center justify-center hero">
        <h2 className="text-2xl text-center font-sec sm:text-5xl leading-3 font-semibold py-4 px-4 max-w-[600px]">
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
        <div className=""></div>
      </div>
      <section
        className="py-8 flex justify-evenly items-center mb-48 h relative 
      after:absolute after:top-8 after:left-8 after:h-24 after:w-24 after:bg-secondary
      before:absolute before:-bottom-40 before:right-8 before:h-24 before:w-24 before:bg-secondary
      "
      >
        <img
          className="h-[700px] w-[400px] object-cover rounded-xl relative top-48"
          src="https://images.pexels.com/photos/5965896/pexels-photo-5965896.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
        />
        <section>
          {sections.map((section, index) => (
            <section key={index} className="py-4">
              <h1 className="text-secondary text-2xl font-sec pb-4">
                {section.heading}
              </h1>
              <p className="max-w-[300px]">{section.content}</p>
            </section>
          ))}
        </section>
        <img
          className="h-[700px] w-[400px] object-cover rounded-xl"
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
