import "../css/logincss.css";
import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [erroMessage, setErroMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`${process.env.REACT_APP_API_BASE_URL}`);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/auth/login`,
        {
          userId: username, // Use 'userId' as key instead of 'username'
          password: password,
        }
      );

      setLoginError(false);
      localStorage.setItem("token", response.data.access_token);
    } catch (error) {
      debugger;
      if (error.response) {
        console.error("Error Data:", error.response.data);
        console.error("Error Status:", error.response.status);
      } else {
        console.error("Error:", error.message);
      }
      setErroMessage(error.response.data.message);
      setLoginError(true);
    }
  };

  return (
    <div>
      <div className="login-background">
        <div>
          <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Username:</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                ></input>
              </div>
              <div>
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                ></input>
              </div>
              <div className="formBottom">
                <button type="submit">Login</button>
                <div>
                  <a href="#">Forgot Password</a>
                </div>
              </div>
            </form>
          </div>
          {loginError && (
            <div className="alert alert-danger error-container" role="alert">
              {erroMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Login;
