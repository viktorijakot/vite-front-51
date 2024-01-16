import { useState } from "react";

import { useFormik } from "formik";
import axios from "axios";
import { useAuthContext } from "../store/authContext";
import useApiData from "../hooks/useApiData";
import SmartInput from "../Components/UI/SmartInput";

const baseCommUrl = "http://localhost:3000/api/comments/post";

function CommentsSection({ postId }) {
  const { token, userEmail } = useAuthContext();
  const currentPath = `${baseCommUrl}/${postId}`;

  const [commArr, setCommArr, err] = useApiData(currentPath, token);
  console.log("commArr ===", commArr);

  const formik = useFormik({
    initialValues: {
      author: userEmail,
      comment: "",
    },
    onSubmit: (valuesObj) => {
      console.log("valuesObj ===", valuesObj);
      const data = {
        author: valuesObj.author,
        comment: valuesObj.comment,
        post_id: postId,
      };
      sendToBackEnd(data);
    },
  });

  async function sendToBackEnd(data) {
    try {
      const resp = await axios.post(baseCommUrl, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("resp ===", resp);
      if (resp.status === 201) {
        // tikrai success
        // data.comm_id = resp.data.comm_id;
        setCommArr((prevState) => {
          const newCommentAdded = {
            comm_id: resp.data.comm_id,
            userEmail: userEmail,
            ...data,
          };
          const newState = [...prevState, newCommentAdded];
          return newState;
        });
        formik.resetForm();
      }
    } catch (error) {
      console.log("error ===", error);
    }
  }

  return (
    <section>
      <h3>Comments</h3>
      <form className="mb-5" onSubmit={formik.handleSubmit}>
        <h2>Create comment form</h2>
        <div className="mb-3">
          <SmartInput readOnly id={"author"} formik={formik} />
        </div>
        <div className="mb-3">
          <SmartInput id={"comment"} type="textarea" formik={formik} />
        </div>
        <button type="submit" className="btn btn-info">
          Comment
        </button>
      </form>
      <ul>
        {commArr.map((cObj) => (
          <li
            className={
              "border p-4 " +
              `${cObj.userEmail === userEmail ? "bg-primary-subtle" : ""}`
            }
            key={cObj.comm_id}
          >
            <h3 className="fs-5">Author: {cObj.author}</h3>
            <p>{cObj.comment}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default CommentsSection;
