import axios from "axios";
import { useFormik } from "formik";
import { useAuthContext } from "../../store/authContext";
import * as Yup from "yup";

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
      cat_id: 0,
    },
    validationSchema: Yup.object({
      title: Yup.string().min(3).required("Privalomas laukas"),
      author: Yup.string().min(3).required(),
      content: Yup.string().min(3).required(),
      date: Yup.string().min(3).required(),
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
        console.warn("ivyko klaida", error.response.data);
      });
  }
  return (
    <div className="container">
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">
            Title
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            name="title"
            type="text"
            className="form-control"
            id="formGroupExampleInput"
          />
          {formik.touched.title && formik.errors.title && (
            <p className="text-danger">{formik.errors.title}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">
            Author
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.author}
            name="author"
            type="text"
            className="form-control"
            id="formGroupExampleInput2"
          />
          {formik.touched.author && formik.errors.author && (
            <p className="text-danger">{formik.errors.author}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">
            Date
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.date}
            name="date"
            type="datetime-local"
            className="form-control"
            id="formGroupExampleInput2"
          />
          {formik.touched.date && formik.errors.date && (
            <p className="text-danger">{formik.errors.date}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">
            Content
          </label>
          <textarea
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.content}
            name="content"
            type="text"
            className="form-control"
            id="formGroupExampleInput2"
          />
          {formik.touched.content && formik.errors.content && (
            <p className="text-danger">{formik.errors.content}</p>
          )}
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
