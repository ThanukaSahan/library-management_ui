import "../css/logincss.css";
import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [erroMessage, setErroMessage] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const [newusername, setNewUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lasttName, setLasttName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [address, setAddress] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [reconfirmpassword, setreconfirmpassword] = useState("");

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

  const handleNewUser = async (e) => {};

  return (
    <div>
      <div className="login-background">
        <div>
          <div className="login-container">
            <div className="loginOrsignup">
              <div
                className="btn-group"
                role="group"
                aria-label="Basic example"
              >
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </button>
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={() => setIsLogin(false)}
                >
                  Sign Up
                </button>
              </div>
            </div>
            {isLogin ? (
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
            ) : (
              <form onSubmit={handleNewUser}>
                <div>
                  <label>Email:</label>
                  <input
                    type="email"
                    value={newusername}
                    onChange={(e) => setNewUserName(e.target.value)}
                    required
                    placeholder="Email will be your User Name"
                  ></input>
                </div>
                <div>
                  <label>First Name:</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  ></input>
                </div>
                <div>
                  <label>Last Name:</label>
                  <input
                    type="text"
                    value={lasttName}
                    onChange={(e) => setLasttName(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label>Mobile No:</label>
                  <input
                    type="number"
                    value={mobileNo}
                    onChange={(e) => setMobileNo(e.target.value)}
                    required
                  ></input>
                </div>
                <div>
                  <label>Address:</label>
                  <input
                    type="text"
                    rows="4"
                    cols="50"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  ></input>
                </div>
                <div>
                  <label>Password:</label>
                  <input
                    type="password"
                    value={newpassword}
                    onChange={(e) => setNewpassword(e.target.value)}
                    required
                  ></input>
                </div>
                <div>
                  <label>Confirm Password:</label>
                  <input
                    type="password"
                    value={newpassword}
                    onChange={(e) => setNewpassword(e.target.value)}
                    required
                  ></input>
                </div>
                <div className="formBottom">
                  <button type="submit">Submit</button>
                </div>
              </form>
            )}
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
