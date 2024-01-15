import { useEffect, useState } from "react";
import { useAuthContext } from "../store/authContext";
import { useParams } from "react-router-dom";
import axios from "axios";

function Comments() {
  const [comments, setComments] = useState();
  const { token } = useAuthContext();
  const URL = "http://localhost:3000/api/comments";
  const { postId } = useParams();

  useEffect(() => {
    getPost(`${URL}/${postId}`);
    function getPost(url) {
      console.log("getPosts");
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("response ===", response);
          const commentsArr = response.data;
          setComments(commentsArr);
        })
        .catch((error) => {
          console.log("error ===", error);
          setComments();
        });
    }
  }, [postId, token]);

  return (
    <>
      {comments &&
        comments.map((commentObj) => (
          <li key={commentObj.comm_id}>
            <p>{commentObj.comment}</p>
            <p>{commentObj.author}</p>
            <p>{new Date(commentObj.created_at).toLocaleDateString("lt")}</p>
          </li>
        ))}
      {!comments && <li>There is no comments yet...</li>}
    </>
  );
}

export default Comments;
