import { useRouter } from "next/router";

const PostPage = ({post}) => {

    const router = useRouter();

    const goBack = ()=>{
        router.replace("/");
    }
  return (
    <div className="p-4">
        <div className="mt-4 max-w-lg border shadow-md shadow-gray-200 rounded-sm p-4 pb-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="font-bold text-2xl">{post.title}</h1>
                <button className="bg-black text-white py-1 px-4 rounded-sm" onClick={goBack}>Home</button>
            </div>
            <img src="pic.jpg" alt={post.title.slice(0,6)} />
            <p>{post.body}</p>
        </div>
    </div>
  )
}


export const getStaticPaths = async ()=>{
    const res = await fetch("http://localhost:5000/api/posts")
    const posts = await res.json();

    const ids = posts.map(post => post.id);
    const paths = ids.map(id => ({params:{id:id.toString()}}) )

    return{
        paths,
        fallback: "blocking"
    }

}

// export const getServerSideProps = async (context) =>{
export const getStaticProps = async (context) =>{
    const res = await fetch(`http://localhost:5000/api/posts/${context.params.id}`)
    const post = await res.json();

    if(res.status !== 200){
        return{
            notFound:true
        }
    }
        return{
        props:{
            post,
            revalidate: 2
        },
    }
}


export default PostPage;