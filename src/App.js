import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import MasterPage from "./components/MasterPage";

function App() {
  const [isAuthenticated, setisAuthenticated] = useState(false);

  const handleLogin = () => {
    setisAuthenticated(true);
  };
  return (
    <div>
      <Router>
        {isAuthenticated ? (
          <>
            <MasterPage></MasterPage>
          </>
        ) : (
          <>
            <Routes>
              <Route
                path="/login"
                element={<Login onLogin={handleLogin}></Login>}
              />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </>
        )}
        ;
      </Router>
    </div>
  );
}

export default App;
