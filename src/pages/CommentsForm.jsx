import SmartInput from "../Components/UI/SmartInput";
import { useAuthContext } from "../store/authContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function CommentsForm() {
  const { token, userEmail } = useAuthContext();
  const URL = "http://localhost:3000/api/comments";
  const { postId } = useParams();

  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: Yup.object({
      comment: Yup.string().min(3).required("Privalomas laukas"),
    }),
    onSubmit: (valuesObj) => {
      console.log(valuesObj);
      const data = {
        author: userEmail,
        comment: valuesObj.comment,
        post_id: postId,
      };
      console.log(data);
      axios
        .post(URL, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((resp) => {
          console.log(resp);
          if (resp.status === 201) {
            // setCommArr([...commArr, {comm_id: resp.data.comm_id, ...data}])
            formik.resetForm();
          }
        })
        .catch((error) => {
          const errorObjFromBackEnd = error.response.data;
          console.warn("ivyko klaida", error.response.data);
          formik.setErrors(errorObjFromBackEnd);
        });
    },
  });

  return (
    <div>
      <form className="mb-5" onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <SmartInput id="comment" type="textarea" formik={formik} />
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default CommentsForm;
