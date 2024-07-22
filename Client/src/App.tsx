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
  const [localUser, setLocalUser] = useState<User | null>(user);
  const [localToken, setLocalToken] = useState<Token>(token);

  useEffect(() => {
    setLocalToken(token); // This will ensure localToken is updated whenever the store's token changes
    setLocalUser(user); // This will ensure localUser is updated whenever the store's user changes
    console.log("Current token:", token);
    console.log("Current user data:", user);
  }, [token, user]);

  return (
    <>
      {localToken ? (
        <div className="admin-container">
          <h2>{`Welcome ${localUser?.firstName} ${localUser?.lastName}`}</h2>
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