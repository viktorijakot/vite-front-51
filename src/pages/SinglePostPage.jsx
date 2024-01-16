import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../store/authContext";
import Comments from "./Comments";

import CommentsForm from "./CommentsForm";
import CommentsSection from "../comments/CommentsSection";

function SinglePostPage() {
  const navigate = useNavigate();

  //gauti kelio parametra :postId
  const { postId } = useParams();
  //parsisiusti is backend single post info
  const URL = "http://localhost:3000/api/posts";

  const [postObj, setPostObj] = useState({});
  const { token, userEmail } = useAuthContext();

  function handleDeletePost() {
    axios
      .delete(`${URL}/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("response ===", response);
        console.log(response.data);
        //sekme
        navigate("/posts");
      })
      .catch((error) => {
        console.warn("error ===", error);
        console.warn("error ===", error.response);
      });
  }

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
      <div className="border border-2 rounded p-3">
        <h2 className="display-3">Post about: {postObj.title}</h2>
        <p className="lead">{postObj.author}</p>
        <p>
          Posted on: <i>{new Date(postObj.date).toLocaleDateString("lt")}</i>
        </p>
        <p>{postObj.content}</p>
        <p className="lead fs-3">Category: {postObj.catagoryName}</p>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/posts")}
            className="btn btn-primary me-2"
          >
            Go back
          </button>
          {userEmail === postObj.userEmail && (
            <button onClick={handleDeletePost} className="btn btn-danger me-2">
              Delete
            </button>
          )}
          {userEmail === postObj.userEmail && (
            <button className="btn btn-warning">Update</button>
          )}
        </div>
      </div>
      <hr />
      <CommentsSection postId={postId} />
      {/* <section>
        <h2>Create a comment</h2>
        <CommentsForm />

        <h3>Comments</h3>
        <ul>
          <Comments />
        </ul>
      </section> */}
    </div>
  );
}

export default SinglePostPage;
