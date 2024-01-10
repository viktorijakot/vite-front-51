import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({
  login() {},
  logout() {},
  isUserLoggedIn: false,
  token: null,
  userEmail: "",
});

AuthContext.displayName = "AutentificationCtx";

function AuthCtxProvider({ children }) {
  const tokenFromStorage = localStorage.getItem("bit_token");
  const emailFromStorage = localStorage.getItem("bit_email");
  const [bitToken, setBitToken] = useState(tokenFromStorage || null);
  const [userEmail, setUserEmail] = useState(emailFromStorage || "");
  //   const navigate = useNavigate();

  //   const isUserLoggedIn = bitToken ? true : false
  //   const isUserLoggedIn = Boolean(bitToken)
  // !! vercia i boolean
  const isUserLoggedIn = !!bitToken;

  function login(token, email) {
    setBitToken(token);
    setUserEmail(email);
    localStorage.setItem("bit_token", token);
    localStorage.setItem("bit_email", email);
  }

  function logout() {
    setBitToken(null);
    setUserEmail("");
    localStorage.removeItem("bit_token");
    localStorage.removeItem("bit_email");
    // navigate("/login");
  }

  const ctxValue = {
    token: bitToken,
    isUserLoggedIn,
    login,
    logout,
    userEmail,
  };

  return (
    <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>
  );
}
export default AuthCtxProvider;

export function useAuthContext() {
  return useContext(AuthContext);
}
