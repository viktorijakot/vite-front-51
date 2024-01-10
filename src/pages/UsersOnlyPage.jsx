import { Link } from "react-router-dom";

function UsersOnlyPage() {
  return (
    <div className="container">
      <h1 className="display-2">Please login to see content</h1>
      <Link to="/login">Login here</Link>
    </div>
  );
}

export default UsersOnlyPage;
