import { useRouter } from "next/router";
import Comment from "../../../components/Comment";
import Meta from "../../../components/Meta";
import MoreCard from "../../../components/MoreCard";
import fetchData from "../../../customFunctions/fetch";
import Reactions from "../../../components/Reactions";
import { useState, useEffect, useContext } from "react";
import { Context } from "../../../context";
import Link from "next/link";

const PostPage = ({ initialPost, recommended }) => {
  const [post, setPost] = useState({ ...initialPost });
  const {
    state: { user },
  } = useContext(Context);
  const [comment, setComment] = useState("");
  const [editModule, setEditModule] = useState(false);

  const toggleModule = () => setEditModule(!editModule);

  useEffect(() => {
    const addView = async () => {
      try {
        const res = await fetchData(`reaction/view/${post.slug}`, "POST");
        const data = await res.json();
        if (res.status === 200) {
          setPost({ ...post, ...data });
          setComment("");
        }
      } catch (error) {
        console.log(error);
      }
    };
    addView();
  }, []);

  const router = useRouter();
  const goBack = () => {
    router.replace("/");
  };

  const sendComment = async (details) => {
    try {
      const res = await fetchData(
        `reaction/comment/${post.slug}`,
        "POST",
        details,
        user.token
      );

      if (res.status === 200) {
        const data = await res.json();
        setPost({ ...post, comments: [...post.comments, data] });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleCommenting = (e) => {
    e.preventDefault();
    if (comment.trim().length < 1) return;
    const details = {
      body: comment,
    };
    sendComment(details);
  };

  const handleDelete = async ()=>{
    try{
      const res = await fetchData(`posts/${post.slug}`,"DELETE",{},user.token);
      const data = await res.json();
      if(res.status === 200){
        console.log(data.message);
        router.push("/");
      }else{
        throw new Error(data.message);
      }
    }catch(error){
      console.log(error)
    }
  
  }

  return (
    <div className="p-4 mb-8">
      <Meta
        description={post.body.slice(0, 100)}
        keywords={post.title.slice(0, 100)}
        title={post.title}
      />
      <button
        className="bg-black text-white py-1 px-4 rounded-sm"
        onClick={goBack}
      >
        Home
      </button>
      <div className="mt-4 flex items-start justify-center gap-4 relative">
        <div className="max-w-2xl border shadow-sm shadow-gray-100 rounded-md p-4 pb-6 relative">
          <h1 className="font-bold text-2xl"> {post.title} </h1>
          <div className="flex justify-between items-center my-4">
            <p className="text-sm text-gray-400">
              <span>By {post.creator.username} </span>
              <span className="inline-block pl-4">
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </p>
            {user.isLogged && user.role === "ADMIN" ? (
              <button
                onClick={toggleModule}
                className="absolute top-2 right-1 bg"
              >
                o
              </button>
            ) : null}
            {editModule && user.isLogged && user.role === "ADMIN" ? (
              <div className="absolute top-2 right-4 p-4 gap-y-2 grid w-32 rounded shadow bg-white shadow-gray-300">
                <Link href={"/edit/[slug]"} as={`/edit/${post.slug}`}>
                  <a className="py-1 flex items-center justify-start w-full gap-x-2 border-b border-gray-400 hover:border-secondary hover:text-secondary transition-colors duration-300">
                    <svg
                      className="h-4 w-4"
                      x="0px"
                      y="0px"
                      viewBox="0 0 64 64"
                      enableBackground="new 0 0 64 64"
                      xmlSpace="preserve"
                    >
                      <g>
                        <path d="M49.7574005,3.641675c-0.2174988-0.1520998-0.4855995-0.2114999-0.7468987-0.1636999   c-0.2602997,0.0467-0.4914017,0.1949-0.6424026,0.4122999L25.3518009,36.9533768   c-0.0888004,0.1266975-0.1463013,0.2728996-0.1687012,0.4269981l-1.5179996,10.4318008   c-0.0545998,0.3733978,0.1072998,0.7467995,0.4173012,0.9622993c0.170599,0.1189003,0.3704987,0.1794014,0.5702991,0.1794014   c0.1637993,0,0.3285999-0.0400009,0.4778004-0.1219025l9.2560005-5.0443001   c0.1364975-0.0741005,0.2534981-0.1783981,0.341198-0.3061981L57.743,10.4184752   c0.3149986-0.4524002,0.2038002-1.0743999-0.2486-1.3893003L49.7574005,3.641675z M33.2243996,42.1477737l-7.2964993,3.9757996   l1.1973-8.222599l22.3104-32.0499992l6.0992012,4.2458L33.2243996,42.1477737z" />
                        <path d="M56.2173004,23.6249752c-0.551899,0-0.9984016,0.4465008-0.9984016,0.9983997v33.4958   c0,2.1419983-1.7421989,3.884201-3.8840981,3.884201H9.1864004c-2.1420002,0-3.8842001-1.7422028-3.8842001-3.884201V15.9707747   c0-2.1418991,1.7421999-3.8841991,3.8842001-3.8841991h24.8432999c0.5517998,0,0.9982986-0.4465008,0.9982986-0.9983006   s-0.4464989-0.9982996-0.9982986-0.9982996H9.1864004c-3.2427001,0-5.8809004,2.6381998-5.8809004,5.8807993V58.119175   c0,3.2425995,2.6382,5.8807983,5.8809004,5.8807983h42.1483994c3.2425995,0,5.8807983-2.6381989,5.8807983-5.8807983v-33.4958   C57.2155991,24.071476,56.7691002,23.6249752,56.2173004,23.6249752z" />
                        <path d="M60.2495995,5.5067749l-8.0080986-5.3388c-0.4602013-0.306-1.0792999-0.1823-1.3843994,0.277   c-0.3062019,0.4591-0.1823006,1.0782,0.2767982,1.3844l8.0082016,5.3386998   c0.1706009,0.1131001,0.3625984,0.1676998,0.5527992,0.1676998c0.3226013,0,0.6394997-0.1559997,0.8316002-0.4445996   C60.8325996,6.4319749,60.7088013,5.8128753,60.2495995,5.5067749z" />
                      </g>
                    </svg>
                    <span>Edit</span>
                  </a>
                </Link>
                <button onClick={handleDelete} className="py-1 flex items-center justify-start w-full gap-x-2 border-b border-gray-400 hover:border-secondary hover:text-secondary transition-colors duration-300">
                  <svg
                    className="h-4 w-4"
                    x="0px"
                    y="0px"
                    viewBox="0 0 64 64"
                    enableBackground="new 0 0 64 64"
                    xmlSpace="preserve"
                  >
                    <g>
                      <path d="M49.7574005,3.641675c-0.2174988-0.1520998-0.4855995-0.2114999-0.7468987-0.1636999   c-0.2602997,0.0467-0.4914017,0.1949-0.6424026,0.4122999L25.3518009,36.9533768   c-0.0888004,0.1266975-0.1463013,0.2728996-0.1687012,0.4269981l-1.5179996,10.4318008   c-0.0545998,0.3733978,0.1072998,0.7467995,0.4173012,0.9622993c0.170599,0.1189003,0.3704987,0.1794014,0.5702991,0.1794014   c0.1637993,0,0.3285999-0.0400009,0.4778004-0.1219025l9.2560005-5.0443001   c0.1364975-0.0741005,0.2534981-0.1783981,0.341198-0.3061981L57.743,10.4184752   c0.3149986-0.4524002,0.2038002-1.0743999-0.2486-1.3893003L49.7574005,3.641675z M33.2243996,42.1477737l-7.2964993,3.9757996   l1.1973-8.222599l22.3104-32.0499992l6.0992012,4.2458L33.2243996,42.1477737z" />
                      <path d="M56.2173004,23.6249752c-0.551899,0-0.9984016,0.4465008-0.9984016,0.9983997v33.4958   c0,2.1419983-1.7421989,3.884201-3.8840981,3.884201H9.1864004c-2.1420002,0-3.8842001-1.7422028-3.8842001-3.884201V15.9707747   c0-2.1418991,1.7421999-3.8841991,3.8842001-3.8841991h24.8432999c0.5517998,0,0.9982986-0.4465008,0.9982986-0.9983006   s-0.4464989-0.9982996-0.9982986-0.9982996H9.1864004c-3.2427001,0-5.8809004,2.6381998-5.8809004,5.8807993V58.119175   c0,3.2425995,2.6382,5.8807983,5.8809004,5.8807983h42.1483994c3.2425995,0,5.8807983-2.6381989,5.8807983-5.8807983v-33.4958   C57.2155991,24.071476,56.7691002,23.6249752,56.2173004,23.6249752z" />
                      <path d="M60.2495995,5.5067749l-8.0080986-5.3388c-0.4602013-0.306-1.0792999-0.1823-1.3843994,0.277   c-0.3062019,0.4591-0.1823006,1.0782,0.2767982,1.3844l8.0082016,5.3386998   c0.1706009,0.1131001,0.3625984,0.1676998,0.5527992,0.1676998c0.3226013,0,0.6394997-0.1559997,0.8316002-0.4445996   C60.8325996,6.4319749,60.7088013,5.8128753,60.2495995,5.5067749z" />
                    </g>
                  </svg>
                  <span>Delete</span>
                </button>
              </div>
            ) : null}
            <Reactions post={post} />
          </div>
          <img
            src="/pic.jpg"
            className="w-full h-[400px] rounded-md"
            alt={post.title.slice(0, 6)}
          />
          <p className="py-4"> {post.body} </p>
          <form onSubmit={handleCommenting} className="px-2 pb-2">
            <textarea
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              required
              rows={5}
              className="border min-h-[80px] rounded outline-none pl-2 focus:border-secondary transition-colors duration-300 border-black w-full"
              placeholder="Leave your reply..."
            ></textarea>
            {user.isLogged ? (
              <button
                type="submit"
                className="inline-block rounded text-white my-2 py-2 px-3 bg-secondary"
              >
                comment
              </button>
            ) : (
              <p className="text-sm font-light">
                <Link href="/login">
                  <a className="border-secondary border-b text-secondary mr-1">
                    Log in
                  </a>
                </Link>
                to add a comment
              </p>
            )}
          </form>
          <div className="min-h-[100px]">
            <p className="px-4 pt-2"> Comments </p>
            <div className="p-4 flex flex-col gap-4">
              {post.comments.length ? (
                post.comments.map((comm) => (
                  <Comment key={comm._id} comment={comm} />
                ))
              ) : (
                <p className="text-sm text-gray-500"> No comments </p>
              )}
            </div>
          </div>
        </div>
        <div className="w-1/3 shadow-sm shadow-gray-200">
          <h2 className="bg-secondary text-white p-4"> Read also </h2>
          <div className="flex flex-col">
            {recommended
              .filter((p) => p._id !== post._id)
              .map((post) => (
                <MoreCard key={post._id} post={post} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const res = await fetchData("posts", "GET");
  const posts = await res.json();

  const slugs = posts.map((post) => post.slug);
  const paths = slugs.map((slug) => ({ params: { slug: slug.toString() } }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async (context) => {
  const res = await fetchData(`posts/${context.params.slug}`);

  if (res.status !== 200) {
    return {
      notFound: true,
    };
  }
  const data = await res.json();

  return {
    props: {
      initialPost: data.post,
      recommended: data.recommended,
      revalidate: 2,
    },
  };
};

export default PostPage;
