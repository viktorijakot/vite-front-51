import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
// import Users from "./Components/Users";
import Login from "./Components/auth/Login";
import Header from "./Components/layout/Header";
import PostList from "./Components/Posts/PostList";
import About from "./Components/About";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";

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
    <div className="">
      <Header
        isUserLoggedIn={isUserLoggedIn}
        email={userEmail}
        logout={logout}
      />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route
          path="/login"
          element={
            <>
              {!isUserLoggedIn && <Login onLogin={handleLogin} />}
              {isUserLoggedIn && (
                <div className="alert alert-success">You have logged in</div>
              )}
            </>
          }
        />
        <Route path="/posts" element={<PostList list={posts} />} />
        <Route path="/about" element={<About />} />
      </Routes>
      {/* {!isUserLoggedIn && <Login onLogin={handleLogin} />}
      {isUserLoggedIn && (
        <div className="alert alert-success">You have logged in</div>
      )} */}
      {/* // <PostList list={posts} />
      // <About /> */}
    </div>
  );
}

export default App;
