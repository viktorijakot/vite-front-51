import axios from "axios";
import { useState } from "react";

function Login() {
  const [authState, setAuthState] = useState({
    email: "",
    password: "",
  });

  //   function handleEmailInput(e) {
  //     setAuthState({ ...authState, email: e.target.value });
  //   }
  //   function handlePassInput(e) {
  //     setAuthState({ ...authState, password: e.target.value });
  //   }

  function handleInput(e) {
    const { name, value } = e.target;
    setAuthState({ ...authState, [name]: value });
  }

  /** jsdoc
   *
   * @param {SubmitEvent} e
   */

  function handleLogin(e) {
    e.preventDefault();
    //validation
    axios
      .post("http://localhost:3000/api/auth/login", authState)
      .then((resp) => {
        console.log(resp);
        const { token } = resp.data;
        console.log(token);
        //issaugoti token i local storage
        localStorage.setItem("bit_token", token);
      })
      .catch((error) => {
        console.warn(error);
        const errorAxios = error.response.error;
      });
  }

  return (
    <div>
      <h2>Login</h2>
      <form noValidate onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="email"
          name="email"
          value={authState.email}
          onChange={handleInput}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={authState.password}
          onChange={handleInput}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
