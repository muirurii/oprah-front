import HomeCategory from "../components/HomeCategory";
import HomeCatLink from "../components/HomeCatLink";
import Meta from "../components/Meta";
import fetchData from "../customFunctions/fetch";

export default function Home({latest,featured}) {
  return (
    <div className="py-8 min-h-screen w-screen">
      <Meta title="Orpah | Home"/>
      <div className="gap-y-12 flex flex-col items-center justify-center hero">
        <h2 className="text-xl sm:text-2xl py-4 px-4 max-w-[600px]">
       <span className="text-secondary">“ </span> 
        Sometimes the ideas just come to me. Other times I have to sweat and almost bleed to make ideas come. It’s a mysterious process, but I hope I never find out exactly how it works. I like a mystery, as you may have noticed.
        <span className="text-secondary"> ”</span>
       <span className="block mt-2"> <span className="text-secondary">~</span>J.K. Rowling </span>
        </h2>
  </div>
      <HomeCategory posts={latest} heading="Latest blogs" />
      <HomeCategory posts={featured} heading="Popular blogs" />
      {/* <section className="my-8">
        <h1 className="text-3xl pl-4">Explore More</h1>
          <ul className="flex flex-wrap items-center justify-evenly p-8 my-8 gap-4">
            <HomeCatLink text="lifestyle" />
            <HomeCatLink text="fashion" />
            <HomeCatLink text="technology" />
          </ul>
      </section> */}
    </div>
  );
}

export const getServerSideProps = async () =>{
    const res = await fetchData('posts/featured',"GET");

    if(res.status !== 200){
      return {
        notFound:true
      }
    }
    const posts = await res.json();

    return{
      props:{
        featured:posts.featured,
        latest:posts.latest,
      }
    }
}