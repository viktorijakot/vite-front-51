import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "../../store/authContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  // pasiimti is konteksto
  const { login } = useAuthContext();
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
        if (token) {
          //handle success
          console.log(token);
          login(token, authState.email);
          navigate("/posts");
          //issaugoti token i local storage
          //   localStorage.setItem("bit_token", token);
          //   onLogin(authState.email);
        }
      })
      .catch((error) => {
        console.warn(error);
        const errorAxios = error.response.error;
        console.log("errorAxios ===", errorAxios);
        //handle error
      });
  }

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} noValidate>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            onChange={handleInput}
            value={authState.email}
            type="email"
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            onChange={handleInput}
            value={authState.password}
            name="password"
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
