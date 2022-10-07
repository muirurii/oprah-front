import { useRouter } from "next/router";
import Meta from "../../../components/Meta";
import MoreCard from "../../../components/MoreCard";
import fetchData from "../../../customFunctions/fetch";
import Reactions from "../../../components/Reactions";
import { useState, useEffect, useContext } from "react";
import { Context } from "../../../context";
import Link from "next/link";
import CommentContainer from "../../../components/CommentContainer";

const PostPage = ({ initialPost, recommended }) => {
  const [post, setPost] = useState(initialPost);

  useEffect(()=>{
  setPost(initialPost)
  },[initialPost]);

  const updatePost = (post) =>{
    setPost(post);
  }

  const {
    state: { user },
  } = useContext(Context);
  const [editModule, setEditModule] = useState(false);

  const toggleModule = () => setEditModule(!editModule);

  useEffect(() => {
    const addView = async () => {
      try {
        const res = await fetchData(`reaction/view/${post.slug}`, "POST");
        const data = await res.json();
        if (res.status === 200) {
          setPost({ ...post, ...data });
        }
      } catch (error) {
        console.log(error);
      }
    };
    addView();
  }, []);

  const router = useRouter();

  const handleDelete = async () => {
    try {
      const res = await fetchData(
        `posts/${post.slug}`,
        "DELETE",
        {},
        user.token
      );
      const data = await res.json();
      if (res.status === 200) {
        console.log(data.message);
        router.push("/");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="py-4 px-2 sm:p-4 mb-8" key={post._id}>
      <Meta
        description={post.body.slice(0, 100)}
        keywords={post.title.slice(0, 100)}
        title={initialPost.title}
      />
      <section className="mt-4 flex items-center lg:items-start text-sm font-light flex-col lg:flex-row justify-center gap-y-4 lg:gap-4 relative">
        <section className="max-w-xl shadow-gray-300 shadow-sm rounded-md p-2 sm:px-4 pb-6 relative">
          <article className="flex justify-between items-start my-4 pr-4">
            <p className="text-sm text-gray-400">
              <span>By {post.creator.username} </span>
              <span className="block pt-1">
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </p>
            {user.isLogged && user.role === "ADMIN" ? (
              <button
                onClick={toggleModule}
                onBlur={()=>{
                  setTimeout(() => {
                    setEditModule(false)
                  }, 50);
                } }
                className="absolute top-4 right-1 h-fit"
              >
                <svg
                  className="h-8 w-4"
                  x="0px"
                  y="0px"
                  viewBox="0 0 290 290"
                  style={{ enableBackground: "new 0 0 290 290" }}
                  xmlSpace="preserve"
                >
                  <g>
                    <rect x="110" y="220" width="70" height="70" />
                    <rect x="110" y="110" width="70" height="70" />
                    <rect x="110" width="70" height="70" />
                  </g>
                </svg>
              </button>
            ) : null}
            {editModule && user.isLogged && user.role === "ADMIN" ? (
              <div className="absolute top-2 right-5 text-sm px-4 py-6 gap-y-2 grid w-32 rounded shadow bg-white shadow-gray-300">
                <Link href={"/edit/[slug]"} as={`/edit/${post.slug}`}>
                  <a className="py-1 flex items-center justify-start w-full gap-x-2 border-b border-gray-400 hover:border-secondary hover:text-secondary transition-colors duration-300">
                    <svg
                      className="h-4 w-4"
                      x="0px"
                      y="0px"
                      viewBox="0 0 64 64"
                      enableBackground="new 0 0 64 64"
                      xmlSpace="preserve"
                      strokeWidth="2px"
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
                <button
                  onClick={handleDelete}
                  className="py-1 flex items-center justify-start w-full gap-x-2 border-b border-gray-400 hover:border-secondary hover:text-secondary transition-colors duration-300"
                >
                  <svg
                    className="h-4 w-4"
                    x="0px"
                    y="0px"
                    viewBox="0 0 330 330"
                    style={{ enableBackground: "new 0 0 330 330" }}
                    xmlSpace="preserve"
                  >
                    <g id="XMLID_109_">
                      <g id="XMLID_221_">
                        <path d="M150,90h30h60h8.08H255c8.284,0,15-6.716,15-15s-6.716-15-15-15h-30h-15V15c0-8.284-6.716-15-15-15H75    c-8.284,0-15,6.716-15,15v45H45H15C6.716,60,0,66.716,0,75s6.716,15,15,15h15h60h30H150z M90,60V30h90v30h-15h-60H90z" />
                      </g>
                      <g id="XMLID_226_">
                        <path d="M30,275c0,8.284,6.716,15,15,15h35V120H30V275z" />
                      </g>
                      <g id="XMLID_231_">
                        <path d="M240,121.076V120h-15h-45v10.145c-11.242,5.354-21.385,12.651-30,21.451V120h-40v105v65h32.596    c19.246,24.348,49.031,40,82.404,40c57.897,0,105-47.103,105-105C330,172.195,290.816,128.377,240,121.076z M225,300    c-13.592,0-26.339-3.652-37.344-10c-2.656-1.532-5.218-3.206-7.656-5.041c-18.204-13.696-30-35.475-30-59.959    s11.796-46.263,30-59.959C192.544,155.602,208.129,150,225,150c5.136,0,10.152,0.52,15,1.509c34.191,6.969,60,37.271,60,73.491    C300,266.355,266.355,300,225,300z" />
                      </g>
                      <g id="XMLID_237_">
                        <path d="M256.819,193.181c-4.55-4.549-11.289-5.549-16.819-3.031c-1.59,0.725-3.086,1.723-4.394,3.031L225,203.787l-10.606-10.606    c-5.857-5.857-15.355-5.857-21.213,0c-5.858,5.857-5.858,15.355,0,21.213L203.787,225l-10.606,10.606    c-5.858,5.857-5.858,15.355,0,21.213c2.929,2.929,6.768,4.394,10.606,4.394c3.839,0,7.678-1.465,10.606-4.394L225,246.213    l10.606,10.606c1.308,1.309,2.804,2.307,4.394,3.031c1.971,0.897,4.088,1.362,6.213,1.362c3.839,0,7.678-1.465,10.606-4.394    c5.858-5.857,5.858-15.355,0-21.213L246.213,225l10.606-10.606C262.678,208.536,262.678,199.038,256.819,193.181z" />
                      </g>
                    </g>
                  </svg>
                  <span>Delete</span>
                </button>
              </div>
            ) : null}
            <Reactions post={post} />
          </article>
          <h1 className="font-bold text-xl pb-2"> {post.title} </h1>
          <img
            src={post.image}
            className="w-full h-[280px] rounded-md"
            alt={post.title.slice(0, 6)}
          />
          <article className="py-4 break-all grid gap-2">
             {post.body.split("#").map((t,i)=> <p key={t+ i}>{t}</p>)} 
            </article>
          <div className="min-h-[100px]">
            <p className="px-4 pt-2"> Comments </p>
            <div className="p-4 flex flex-col gap-4">
                <CommentContainer postId={post._id} updatePost={updatePost} />
            </div>
          </div>
        </section>
        <article className="min-w-[33%] max-w-xl lg:max-w-md shadow-sm rounded overflow-hidden shadow-gray-200">
          <h2 className="bg-secondary text-white p-4"> Read also </h2>
          <div className="flex flex-col w-full">
            {recommended
              .filter((p) => p._id !== post._id)
              .map((post) => (
                <MoreCard key={post._id} post={post} />
              ))}
          </div>
        </article>
      </section>
    </main>
  );
};

// export const getStaticPaths = async () => {
//   const res = await fetchData("posts", "GET");
//   const posts = await res.json();

//   const slugs = posts.map((post) => post.slug);
//   const paths = slugs.map((slug) => ({ params: { slug: slug.toString() } }));

//   return {
//     paths,
//     fallback: "blocking",
//   };
// };

// export const getStaticProps = async (context) => {
export const getServerSideProps = async (context) => {
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
      // revalidate: 2,
    },
  };
};

export default PostPage;
