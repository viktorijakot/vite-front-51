import SinglePost from "./SinglePost";
import PropTypes from "prop-types";

function PostsList({ list }) {
  return (
    <div className="container">
      <h2 className="display-3">Our posts</h2>

      <ul className="unlisted grid-2">
        {list.map((post) => (
          <SinglePost key={post.post_id} post={post} />
        ))}
      </ul>
    </div>
  );
}

PostsList.propTypes = {
  list: PropTypes.array,
};
export default PostsList;
