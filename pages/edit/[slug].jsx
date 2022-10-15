import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import FormFields from "../../components/FormFields";
import Meta from "../../components/Meta";
import { Context } from "../../context";
import fetchData from "../../customFunctions/fetch";
import Loader from "../../components/Loader";

const Edit = () => {
  const {
    state: { user },
  } = useContext(Context);
  const [message, setMessage] = useState("");
  const [post, setPost] = useState({});
  const [fetchingPost, setFetchingPost] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    const getPost = async () => {
      if (fetchingPost) return;
      setFetchingPost(true);
      try {
        const res = await fetchData(`posts/${slug}`, "GET");
        const data = await res.json();
        if (res.status === 200) {
          setPost(data.post);
        } else {
          throw new Error(data.message);
        }
        setFetchingPost(false);
      } catch (error) {
        console.log(error);
        setMessage(error.message);
        setFetchingPost(false);
      }
    };
    getPost();
  }, []);

  const submitHandler = async (data) => {
    setIsSubmitting(true);
    if(isSubmitting) return;
    setMessage("");
    
    const details = {
      oldTitle: post.title,
      newTitle: data.title,
      newImage: data.image,
      newCategories: data.categories,
      newBody: data.body,
    };

    try {
      const res = await fetchData(
        `posts/${post.slug}`,
        "PUT",
        details,
        user.token
      );
      const data = await res.json();
      if (res.status === 200) {
        router.push(`/posts/${data.slug}`);
        setIsSubmitting(false);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setMessage("unable to update");
      setIsSubmitting(false);
      console.log(error);
    }
  };

  return (
    <main>
      <Meta title="Update post" />
      {fetchingPost ? <Loader /> : !user.isLogged || user.role !== "ADMIN" ? (
        <div className="h-[400px] flex items-center justify-center">
          <Meta title="You are not logged in" />
          <Link href="/login">
            <a className="border-secondary border-b text-secondary">Log in</a>
          </Link>
        </div>
      ) : (
        <>
        <h1 className="text-3xl pt-4 text-center">Edit blog post</h1>
        <FormFields
          initial={post}
          buttonText="Update blog"
          message={message}
          submitHandler={submitHandler}
          isSubmitting={isSubmitting}
        />
        </>
      )}
    </main>
  );
};

export default Edit;
