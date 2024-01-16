import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../store/authContext";
const postObj = {
  post_id: 1,
  title: "Post 1",
  author: "James Band",
  userEmail: "j@b.com",
  content: "Body of post 1",
  date: "2023-12-26T22:00:00.000Z",
  commentCount: 1,
  catagoryName: "Comedy",
};

function SinglePost({ post }) {
  const { userEmail } = useAuthContext();

  return (
    <li
      className={`card ${
        userEmail === post.userEmail
          ? `border border-success bg-success-subtle`
          : ``
      }`}
    >
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{post.author}</h6>
        <p className="card-text">{post.content}</p>
        <p className="card-text">
          Date: {new Date(post.date).toLocaleDateString("lt")}
        </p>
        <p className="card-text">Comment Count: {post.commentCount}</p>
        <p className="card-text">Category: {post.catagoryName}</p>
        <Link to={`/posts/${post.post_id}`} className="btn btn-info">
          Read more
        </Link>
      </div>
    </li>
  );
}
SinglePost.propTypes = {
  post: PropTypes.exact({
    post_id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    commentCount: PropTypes.number,
    catagoryName: PropTypes.string.isRequired,
  }),
};
export default SinglePost;
