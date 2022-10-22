import { useEffect, useState } from "react";
import Comment from "./Comment";
import fetchData from "../customFunctions/fetch";

const SubCommentContainer = ({ commentId, newComment }) => {
  const [subComments, setSubComments] = useState([]);
  const [loadingReplies,setLoadingReplies] = useState(false);

  useEffect(() => {
    const getReplies = async () => {
      setLoadingReplies(true);
      try {
        const res = await fetchData(`comments/subcomments/${commentId}`, "GET");
        const data = await res.json();
        if (res.status === 200) {
          setSubComments(data.subComments);
        }
        setLoadingReplies(false);
      } catch (error) {
        setLoadingReplies(false);
        console.log(error.message);
      }
    };
    getReplies();
  }, []);

  useEffect(() => {
    if (Object.values(newComment).length) {
      setSubComments([...subComments, newComment]);
    }
  }, [newComment]);

  return (
    <div className="">
      { !loadingReplies ? subComments.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt)  ,0).map((sub) => (
        <div  key={sub._id} className="pb-2">
        <Comment comment={sub} isSub={true} />
        </div>
      ))
      : <div className="border-2 rounded-full border-black border-t-secondary border-r-secondary h-6 w-6 my-4 ml-8 animate-spin"></div>}
    </div>
  );
};

export default SubCommentContainer;
