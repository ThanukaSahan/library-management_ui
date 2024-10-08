import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import MasterPage from "./components/MasterPage";

function App() {
  const [isAuthenticated, setisAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = sessionStorage.getItem("isAuthenticated");
    if (authStatus === "true") {
      setisAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setisAuthenticated(true);
    sessionStorage.setItem("isAuthenticated", "true");
  };
  return (
    <div>
      <Router>
        {isAuthenticated ? (
          <>
            <MasterPage />
          </>
        ) : (
          <>
            <Login onLogin={handleLogin} />
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
