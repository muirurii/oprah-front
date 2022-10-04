import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import FormFields from "../../components/FormFields";
import Meta from "../../components/Meta";
import { Context } from "../../context";
import fetchData from "../../customFunctions/fetch";

const Edit = () => {
  const {
    state: { user },
  } = useContext(Context);
  const [message, setMessage] = useState("");
  const [post, setPost] = useState({});
  const [fetching, setFetching] = useState(false);
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    const getPost = async () => {
      if (fetching) return;
      setFetching(true);
      try {
        const res = await fetchData(`posts/${slug}`, "GET");
        const data = await res.json();
        if (res.status === 200) {
          setPost(data.post);
        } else {
          throw new Error(data.message);
        }
        setFetching(false);
      } catch (error) {
        console.log(error);
        setMessage(error.message);
        setFetching(false);
      }
    };
    getPost();
  }, []);

  const submitHandler = async (data) => {
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
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setMessage(error.message);
      console.log(error);
    }
  };

  return (
    <main>
      <Meta title="Update post" />
      {fetching || !user.isLogged || user.role !== "ADMIN" ? (
        <div className="h-[500px]">log in</div>
      ) : (
        <FormFields
          initial={post}
          buttonText="Update blog"
          message={message}
          submitHandler={submitHandler}
        />
      )}
    </main>
  );
};

export default Edit;
