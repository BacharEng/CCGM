import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";

import useUserStore from "./store/useUserStore";
import { User } from "./types/userTypes";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import LoginPage from "./screens/loginPage";
import AdminScreen from "./screens/adminScreen";

// Assuming the type of token is string. Adjust according to your actual data model.
type Token = string | null | undefined;

const App: React.FC = () => {
  const user: User | null = useUserStore((state) => state.user);
  const token: Token = useUserStore((state) => state.token);
  const setUser = useUserStore((state) => state.setUser);
  const setToken = useUserStore((state) => state.setToken);
  const logout = useUserStore((state) => state.logout);

  // Initialize state with values from localStorage or from the store if available
  const [localUser, setLocalUser] = useState<User | null>(() => {
    if (user) return user;
    const savedUserData = localStorage.getItem("userData");
    return savedUserData ? JSON.parse(savedUserData) : null;
  });

  const [localToken, setLocalToken] = useState<Token>(() => {
    if (token) return token;
    return localStorage.getItem("token");
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      setLocalToken(token);
    } else {
      localStorage.removeItem("token");
      setLocalToken(null);
    }

    if (user) {
      localStorage.setItem("userData", JSON.stringify(user));
      setLocalUser(user);
    } else {
      localStorage.removeItem("userData");
      setLocalUser(null);
    }
  }, [user, token]);

  // Check for session timeout
  useEffect(() => {
    const tokenTimestamp = localStorage.getItem("tokenTimestamp");
    if (tokenTimestamp) {
      const currentTime = Date.now();
      const tokenTime = parseInt(tokenTimestamp, 10);
      if (currentTime - tokenTime > import.meta.env.SESSION_TIMEOUT) {
        handleLogout();
      }
    }
  }, []);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    localStorage.removeItem("tokenTimestamp");
    setLocalUser(null);
    setLocalToken(null);
  };

  return (
    <>
      {localToken ? (
        <div className="admin-container">
          <AdminScreen localUser={localUser} handleLogout={handleLogout} />
        </div>
      ) : (
        <div className="container-fluid h-100">
          <div className="row h-100 align-items-center">
            <div className="col-3"></div>
            <div className="col-6 text-center">
              <h1>CCGM website</h1>
              <LoginPage />
            </div>
            <div className="col-3"></div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default App;
