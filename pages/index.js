import HomeCategory from "../components/HomeCategory";
import HomeCatLink from "../components/HomeCatLink";

export default function Home({latest,featured}) {
  return (
    <div className="py-8 pt-[500px] min-h-screen -top-[80px] w-screen relative">
      <div className="absolute top-0 left-0 h-[500px] w-screen gap-y-12 flex flex-col items-center justify-center bg9-[#fffeff75]">
        <h2 className="text-3xl py-4">Welcome to my blog</h2>
        <button className="text-white bg-black rounded py-2 px-5">To blogs</button>
        <img className="absolute top-0 -z-30 left-0 h-full w-screen" src="https://images.pexels.com/photos/3975572/pexels-photo-3975572.jpeg?auto=compress&cs=tinysrgb&w=1024" alt="HERO" />
      </div>
      <HomeCategory posts={latest} heading="Latest blogs" />
      <HomeCategory posts={featured} heading="Popular blogs" />
      <section className="my-8">
        <h1 className="text-3xl pl-4">Explore More</h1>
          <ul className="grid grid-cols-4 p-8 my-8 gap-4">
            <HomeCatLink text="lifestyle" />
            <HomeCatLink text="fashion" />
            <HomeCatLink text="technology" />
            <HomeCatLink text="politics" />
          </ul>
      </section>
    </div>
  );
}

export const getStaticProps = async () =>{
    const res = await fetch("http://localhost:5000/api/posts/featured");
    const posts = await res.json();

    return{
      props:{
        featured:posts.featured,
        latest:posts.latest,
        revalidate: 1
      }
    }
}
