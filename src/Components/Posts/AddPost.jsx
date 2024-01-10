import { Formik, useFormik } from "formik";
function AddPost() {
  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      content: "",
      date: "",
      cat_id: 1,
    },
    onSubmit: (valuesObj) => {
      console.log(valuesObj);
      // isiusti su axios
    },
  });
  return (
    <div className="container">
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">
            Title
          </label>
          <input
            onChange={formik.handleChange}
            value={formik.values.title}
            name="title"
            type="text"
            className="form-control"
            id="formGroupExampleInput"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">
            Author
          </label>
          <input
            onChange={formik.handleChange}
            value={formik.values.author}
            name="author"
            type="text"
            className="form-control"
            id="formGroupExampleInput2"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">
            Date
          </label>
          <input
            onChange={formik.handleChange}
            value={formik.values.date}
            name="date"
            type="datetime-local"
            className="form-control"
            id="formGroupExampleInput2"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">
            Content
          </label>
          <textarea
            onChange={formik.handleChange}
            value={formik.values.content}
            name="content"
            type="text"
            className="form-control"
            id="formGroupExampleInput2"
          />
        </div>
        <select
          onChange={formik.handleChange}
          value={formik.values.cat_id}
          name="cat_id"
          className="form-select form-select-lg mb-3"
        >
          <option selected disabled>
            Select Category
          </option>
        </select>
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
