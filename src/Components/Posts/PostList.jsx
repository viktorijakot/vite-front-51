import SinglePost from "./SinglePost";

function PostsList({ list }) {
  return (
    <div>
      <h2 className="display-3">Our posts</h2>

      <ul className="unlisted grid-2">
        {list.map((post) => (
          <SinglePost key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
}

export default PostsList;
