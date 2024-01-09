import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
// import Users from "./Components/Users";
import Login from "./Components/auth/Login";
import Header from "./Components/layout/Header";
import PostList from "./Components/Posts/PostList";

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const postUrl = "http://localhost:3000/api/posts/";

  //parsisiusti postus ir paduoti i postList
  const [posts, setPosts] = useState([]);

  // parisisiusti postus ir paduoti i postsLIst

  useEffect(() => {
    getPosts(postUrl);
    function getPosts(url) {
      console.log("getPosts");
      axios
        .get(url)
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

  function handleLogin(email) {
    console.log("user logged in", email);
    setIsUserLoggedIn(true);
    setUserEmail(email);
  }

  function logout() {
    setIsUserLoggedIn(false);
    setUserEmail("");
  }
  return (
    <div className="container">
      <Header
        isUserLoggedIn={isUserLoggedIn}
        email={userEmail}
        logout={logout}
      />
      {!isUserLoggedIn && <Login onLogin={handleLogin} />}
      {isUserLoggedIn && (
        <div className="alert alert-success">You have logged in</div>
      )}
      <PostList list={posts} />
    </div>
  );
}

export default App;
