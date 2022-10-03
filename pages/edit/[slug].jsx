import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FormFields from "../../components/FormFields";
import Meta from "../../components/Meta";
import fetchData from "../../customFunctions/fetch";

const Edit = () => {

  const [post, setPost] = useState({}); 
  const[fetching,setFetching] = useState(false);
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    const getPost = async () => {
      if(fetching) return;
      setFetching(true);
      try {
        const res = await fetchData(`posts/${slug}`, "GET");
        if (res.status === 200) {
          const data = await res.json();
          setPost(data.post);
          console.log(data.post.category[0])
        } else {
          throw new Error("Unable to fetch");
        }
        setFetching(false);
      } catch (error) {
        console.log(error);
        setFetching(false);
      }
    };
    getPost();
  }, []);
 

  return (
    <main>
      <Meta title="Update post" />
     {fetching ? null : <FormFields initial={post} buttonText="Update post" />}
    </main>
  );
};

export default Edit;
