/* eslint-disable @typescript-eslint/no-unused-vars */
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
      localStorage.setItem("tokenTimestamp", Date.now().toString());
      setLocalToken(token);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenTimestamp");
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

  useEffect(() => {
    // Function to check for session timeout
    const checkSessionTimeout = () => {
      const tokenTimestamp = localStorage.getItem("tokenTimestamp");
      if (tokenTimestamp) {
        const currentTime = Date.now();
        const tokenTime = parseInt(tokenTimestamp, 10);
        if (currentTime - tokenTime > import.meta.env.SESSION_TIMEOUT) {
          handleLogout();
        }
      }
    };
  
    // Check session timeout on mount
    checkSessionTimeout();
  
    // Set interval to check session timeout periodically
    const intervalId = setInterval(checkSessionTimeout, 60000); // Check every 60 seconds
  
    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
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
      {localUser && localToken ? (
        <div className="admin-container">
          <AdminScreen />
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