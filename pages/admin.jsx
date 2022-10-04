import { useContext,useState } from "react";
import {useRouter} from "next/router";
import FormFields from "../components/FormFields";
import Meta from "../components/Meta";
import { Context } from "../context";
import fetchData from "../customFunctions/fetch";

const Admin = () => {
  const {
    state: { user },
  } = useContext(Context);

  const[message,setMessage] = useState("");

  const router = useRouter();
  const submitHandler = async (data) => {
    const { title, body, image, categories } = data;
    const details = {
      title,
      body,
      image,
      categories,
    };

    try {
      console.log(details);
      const res = await fetchData("posts/new", "POST", details, user.token);
       const data = await res.json();
       if (res.status === 200) {
          router.push(`/posts/${data.slug}`);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setMessage(error.message);
      console.log(error.message);
    }
  };
  return (
    <main className="px-4 min-h-screen">
      <Meta title="Add a blog" />
      <h1 className="text-3xl pt-4 text-center">Add a post</h1>
      <FormFields
        initial={{}}
        buttonText="Add blog"
        message={message}
        submitHandler={submitHandler}
      />
    </main>
  );
};

export default Admin;
