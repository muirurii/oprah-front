import { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import FormFields from "../components/FormFields";
import Meta from "../components/Meta";
import { Context } from "../context";
import fetchData from "../customFunctions/fetch";

const Admin = () => {
  const {
    state: { user },
  } = useContext(Context);

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const submitHandler = async (data) => {
    if(isSubmitting) return;
    setIsSubmitting(true);
    console.log(data);

    const { title, body, image, categories,excerpt } = data;
    const details = {
      title,
      body,
      excerpt,
      image,
      categories,
    };

    try {
      const res = await fetchData("posts/new", "POST", details, user.token);
      const data = await res.json();
      if (res.status === 200) {
        router.push(`/posts/${data.slug}`);
        setIsSubmitting(false);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setMessage(error.message);
      setIsSubmitting(false);
      console.log(error.message);
    }
  };
  return (
    <main className="">
      {!user.isLogged || user.role !== "ADMIN" ? (
        <div className="h-[400px] flex items-center justify-center">
          <Meta title="You are not logged in" />
          <Link href="/login">
            <a className="border-secondary border-b text-secondary">Log in</a>
          </Link>
          <span className="inline-block ml-1"> to view your account</span>
        </div>
      ) : (
        <>
          <Meta title="Add a blog" />
          <h1 className="text-3xl pt-4 text-center">New blog post</h1>
          <FormFields
            initial={{}}
            buttonText="Add blog"
            message={message}
            submitHandler={submitHandler}
            isSubmitting={isSubmitting}
          />
        </>
      )}
    </main>
  );
};

export default Admin;
