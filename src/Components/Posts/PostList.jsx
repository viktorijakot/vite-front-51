import { useEffect, useState } from "react";
import SinglePost from "./SinglePost";
import PropTypes from "prop-types";
import axios from "axios";

function PostsList() {
  //parsisiusti postus ir paduoti i postList
  const [posts, setPosts] = useState([]);
  const postUrl = "http://localhost:3000/api/posts/";
  const tokenStorage = localStorage.getItem("bit_token");
  const [token, setToken] = useState(tokenStorage);

  // parisisiusti postus ir paduoti i postsLIst

  useEffect(() => {
    getPosts(postUrl);
    function getPosts(url) {
      console.log("getPosts");
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("response ===", response);
          const posts = response.data;
          setPosts(posts);
        })
        .catch((error) => {
          console.log("error ===", error);
        });
    }
  }, []);
  return (
    <div className="container">
      <h2 className="display-3">Our posts</h2>

      <ul className="unlisted grid-2">
        {posts.map((post) => (
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
