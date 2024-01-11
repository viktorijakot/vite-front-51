import axios from "axios";
import { useFormik } from "formik";
import { useAuthContext } from "../../store/authContext";
import * as Yup from "yup";
import SmartInput from "../UI/SmartInput";

function AddPost() {
  const url = "http://localhost:3000/api/posts";

  // const postObj = {
  //   title: "Post 1",
  //   author: "James Band",
  //   content: "Body of post 1",
  //   date: "2023-12-26T22:00:00.000Z",
  //   cat_id: 1,
  // };

  const categotries = [
    {
      cat_id: 1,
      title: "Comedy",
    },
    {
      cat_id: 2,
      title: "Thriller ",
    },
    {
      cat_id: 3,
      title: "Tragedy",
    },
    {
      cat_id: 4,
      title: "Detective ",
    },
  ];

  const { token } = useAuthContext();
  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      content: "",
      date: "",
      cat_id: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().min(3).required("Privalomas laukas"),
      author: Yup.string().min(3).required(),
      content: Yup.string().min(5, "Prasom placiau").required(),
      date: Yup.date().required(),
      cat_id: Yup.number().min(1).required(),
    }),
    onSubmit: (valuesObj) => {
      console.log(valuesObj);
      // isiusti su axios
      sendCreateNewPost(valuesObj);
    },
  });

  function sendCreateNewPost(data) {
    axios
      .post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        console.log(resp);
      })
      .catch((error) => {
        const errorObjFromBackEnd = error.response.data;
        console.warn("ivyko klaida", error.response.data);
        formik.setErrors(errorObjFromBackEnd);
      });
  }
  return (
    <div className="container">
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <SmartInput id="title" formik={formik} />
        </div>
        <div className="mb-3">
          <SmartInput id="author" formik={formik} />
        </div>
        <div className="mb-3">
          <SmartInput id="date" type="date" formik={formik} />
        </div>
        <div className="mb-3">
          <SmartInput id="content" type="textarea" formik={formik} />
        </div>
        <select
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.cat_id}
          name="cat_id"
          className="form-select form-select-lg mb-3"
        >
          <option defaultValue>Select Category</option>
          {categotries.map((cat) => (
            <option key={cat.cat_id} value={cat.cat_id}>
              {cat.title}
            </option>
          ))}
        </select>
        {formik.touched.cat_id && formik.errors.cat_id && (
          <p className="text-danger">{formik.errors.cat_id}</p>
        )}
        <div>
          <button type="submit" classNameName="btn btn-primary">
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPost;
