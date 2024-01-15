import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../store/authContext";
import Comments from "./Comments";
import CommentsForm from "./CommentsForm";
const array = ["a"];
const [item] = array;
console.log(item === array);
function SinglePostPage() {
  //gauti kelio parametra :postId
  const { postId } = useParams();
  //parsisiusti is backend single post info
  const URL = "http://localhost:3000/api/posts";

  const [postObj, setPostObj] = useState({});
  const { token } = useAuthContext();

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
          const post = response.data;
          setPostObj(post);
        })
        .catch((error) => {
          console.log("error ===", error);
        });
    }
  }, [postId, token]);

  return (
    <div className="container">
      <h2 className="display-3">Post about: {postObj.title}</h2>
      <p className="lead">{postObj.author}</p>
      <p>
        Posted on: <i>{new Date(postObj.date).toLocaleDateString("lt")}</i>
      </p>
      <p>{postObj.content}</p>
      <p className="lead fs-3">{postObj.categoryName}</p>

      <section>
        <h2>Create a comment</h2>
        <CommentsForm />

        <h3>Comments</h3>
        <ul>
          <Comments />
        </ul>
      </section>
    </div>
  );
}

export default SinglePostPage;
