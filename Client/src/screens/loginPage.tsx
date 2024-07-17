import { useState } from "react";
import AuthPage from "../components/AuthPage";

const LoginPage: React.FC = () => {
  const [isLoginPage, setIsLoginPage] = useState<boolean>(true);

  return (
    <>
      {isLoginPage ? (
        <>
          <AuthPage />
          <div className="col-12">
            <button
              className="btn btn-primary mt-3"
              onClick={() => setIsLoginPage(!isLoginPage)}
            >
              Forgot my password
            </button>
          </div>
        </>
      ) : (
        <>
          <h1>Forgot Password</h1>
          <button
            className="btn btn-primary mt-3"
            onClick={() => setIsLoginPage(!isLoginPage)}
          >
            return to login
          </button>
        </>
      )}
    </>
  );
};

export default LoginPage;
