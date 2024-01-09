import { useState } from "react";
import "./App.css";
// import Users from "./Components/Users";
import Login from "./Components/auth/Login";
import Header from "./Components/layout/Header";

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

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
    </div>
  );
}

export default App;
