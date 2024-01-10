function AddPost({ handleAdd }) {
  return (
    <div className="container">
      <form onSubmit={handleAdd}>
        <div class="mb-3">
          <label for="formGroupExampleInput" class="form-label">
            Title
          </label>
          <input
            name="title"
            type="text"
            class="form-control"
            id="formGroupExampleInput"
            placeholder="Title"
          />
        </div>
        <div class="mb-3">
          <label for="formGroupExampleInput2" class="form-label">
            Author
          </label>
          <input
            name="author"
            type="text"
            class="form-control"
            id="formGroupExampleInput2"
            placeholder="Author"
          />
        </div>
        <div class="mb-3">
          <label for="formGroupExampleInput2" class="form-label">
            Date
          </label>
          <input
            name="date"
            type="date"
            class="form-control"
            id="formGroupExampleInput2"
            placeholder="Date"
          />
        </div>
        <div class="mb-3">
          <label for="formGroupExampleInput2" class="form-label">
            Content
          </label>
          <textarea
            name="content"
            type="text"
            class="form-control"
            id="formGroupExampleInput2"
            placeholder="Content"
          />
        </div>
        <select name="catagory" class="form-select form-select-lg mb-3">
          <option selected disabled>
            Select Category
          </option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
        <div>
          <button type="submit" className="btn btn-primary">
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPost;
