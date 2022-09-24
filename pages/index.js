import HomeCategory from "../components/HomeCategory";
import HomeCatLink from "../components/HomeCatLink";
import Post from "../components/Post";

export default function Home({latest,popular}) {
  return (
    <div className="py-8 pt-[420px] min-h-screen w-screen relative">
      <div className="absolute top-0 left-0 h-[400px] w-screen gap-y-12 flex flex-col items-center justify-center bg-[#ffffff88]">
        <h2 className="text-3xl py-4">Welcome to my blog</h2>
        <button className="text-white bg-black rounded py-2 px-5">To blogs</button>
        <img className="absolute top-0 -z-30 left-0 h-full w-screen" src="pic.jpg" alt="HERO" />
      </div>
      <HomeCategory posts={latest} heading="Latest blogs" />
      <HomeCategory posts={popular} heading="Popular blogs" />
      <section className="my-8">
        <h1 className="text-3xl">Exprole More</h1>
          <ul className="grid grid-cols-4 p-8 gap-4">
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
    const res = await fetch("http://localhost:5000/api/posts");
    const posts = await res.json();
    console.log("Fetched");
    return{
      props:{
        latest:posts.latest,
        popular:posts.popular,
        revalidate: 1
      }
    }
}
