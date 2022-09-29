import PostsContainer from '../components/PostsContainer';

const Category = ({posts,heading}) => {
  return (
    <main>
        <h1 className='text-3xl py-8'>{heading}</h1>
        <PostsContainer posts={posts} />
    </main>
  )
}

export default Category;

export const getServerSideProps = async (context) =>{
    const res = await fetch(`http://localhost:5000/api/posts/${context.params.category}`);
    const posts =  await res.json();
    console.log(posts)
    return{
        props:{
            posts,
            heading:context.params.category
        }
    }
}