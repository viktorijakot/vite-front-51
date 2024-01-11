export default function SmartInput({ id, formik, type = "text" }) {
  //id = title
  const areaInput = (
    <textarea
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values[id]}
      name={id}
      type="text"
      className="form-control"
      id={id}
      rows="3"
    />
  );
  return (
    <>
      <label className="form-label w-100">
        <span>{id.charAt(0).toUpperCase() + id.slice(1)}</span>
        {type === "textarea" ? (
          areaInput
        ) : (
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values[id]}
            name={id}
            type={type}
            className="form-control"
            id={id}
          />
        )}
      </label>
      {formik.touched[id] && formik.errors[id] && (
        <p className="text-danger">{formik.errors[id]}</p>
      )}
    </>
  );
}
