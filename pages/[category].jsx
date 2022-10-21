import PostsContainer from '../components/PostsContainer';
import Meta from "../components/Meta";
import fetchData from '../customFunctions/fetch';

const Category = ({posts,heading}) => {
  return (
    <main>
      <Meta description={posts[0].body.slice(0,100)} 
              keywords={posts[0].title.slice(0,100)}
              title={heading}
        />
        <h1 className='text-3xl pt-8 pl-4 capitalize'>{heading}</h1>
        <PostsContainer posts={posts} />
    </main>
  )
}

export default Category;

export const getServerSideProps = async (context) =>{
    const res =  await fetchData(`posts/category/${context.params.category}`,"GET");
    const posts =  await res.json();

    if(res.status !== 200){
      return {
        notFound: true,
      };
    }

    return{
        props:{
            posts,
            heading:context.params.category
        }
    }
}