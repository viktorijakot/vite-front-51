import "./App.css";
// import Users from "./Components/Users";
import Login from "./Components/auth/Login";
import Header from "./Components/layout/Header";
import PostList from "./Components/Posts/PostList";
import About from "./Components/About";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import AddPost from "./Components/Posts/AddPost";
import { useAuthContext } from "./store/authContext";
import UsersOnlyPage from "./pages/UsersOnlyPage";
import SinglePostPage from "./pages/SinglePostPage";

function App() {
  // const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  // const [userEmail, setUserEmail] = useState("");
  // const postUrl = "http://localhost:3000/api/posts/";

  // //parsisiusti postus ir paduoti i postList
  // const [posts, setPosts] = useState([]);

  // // parisisiusti postus ir paduoti i postsLIst

  // useEffect(() => {
  //   getPosts(postUrl);
  //   function getPosts(url) {
  //     console.log("getPosts");
  //     axios
  //       .get(url)
  //       .then((response) => {
  //         console.log("response ===", response);
  //         const posts = response.data;
  //         setPosts(posts);
  //       })
  //       .catch((error) => {
  //         console.log("error ===", error);
  //       });
  //   }
  // }, []);

  // function handleLogin(email) {
  //   console.log("user logged in", email);
  //   setIsUserLoggedIn(true);
  //   setUserEmail(email);
  // }

  // function logout() {
  //   setIsUserLoggedIn(false);
  //   setUserEmail("");
  // }

  const { isUserLoggedIn } = useAuthContext();
  return (
    <div className="">
      <Header
      // isUserLoggedIn={isUserLoggedIn}
      // email={userEmail}
      // logout={logout}
      />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route
          path="/login"
          element={
            <>
              {!isUserLoggedIn && <Login />}
              {isUserLoggedIn && (
                <div className="alert alert-success">You have logged in</div>
              )}
            </>
          }
        />
        {/*protected route*/}
        <Route
          path="/posts"
          element={
            isUserLoggedIn ? <PostList /> : <Navigate to={"/users-only"} />
          }
        />
        <Route
          path="/add-post"
          element={
            isUserLoggedIn ? <AddPost /> : <Navigate to={"/users-only"} />
          }
        />
        <Route path="/posts/:postId" element={<SinglePostPage />} />
        <Route path="/home" element={<Navigate to={"/"} />} />
        <Route path="/users-only" element={<UsersOnlyPage />} />
        {/* <Route path="/add" element={<AddPost handleAdd={handleAdd} />} /> */}
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
