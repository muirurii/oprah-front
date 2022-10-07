import { useEffect, useState } from "react";
import Comment from "./Comment";
import fetchData from "../customFunctions/fetch";

const SubCommentContainer = ({ commentId, newComment }) => {
  const [subComments, setSubComments] = useState([]);

  useEffect(() => {
    const getReplies = async () => {
      try {
        const res = await fetchData(`comments/subcomments/${commentId}`, "GET");
        const data = await res.json();
        if (res.status === 200) {
          setSubComments(data.subComments);
        }
      } catch (error) {
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
      {subComments.map((sub) => (
        <Comment comment={sub} key={sub._id} isSub={true} />
      ))}
    </div>
  );
};

export default SubCommentContainer;
