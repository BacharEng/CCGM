import { useState } from "react";
import AuthPage from "../components/AuthPage";
import ResetPassword from "../components/ResetPassword";
import NewUserForm from "../components/NewUserForm"; // Import NewUserForm component

const LoginPage: React.FC = () => {
  const [view, setView] = useState<"login" | "resetPassword" | "newUser">(
    "login"
  ); // Updated state to handle multiple views

  return (
    <>
      {view === "login" ? (
        <>
          <AuthPage />
          <div className="col-12 d-flex flex-column align-items-center mt-4">
            <button
              className="btn btn-primary mb-2 newUserBtn"
              onClick={() => setView("newUser")}
            >
              New to the website? Sign here!
            </button>
            <button
              className="btn btn-outline-secondary forgotPasswordBtn"
              onClick={() => setView("resetPassword")}
            >
              Forgot my password
            </button>
          </div>
        </>
      ) : view === "resetPassword" ? (
        <>
          <ResetPassword
            onPasswordResetSuccess={(res) => {
              res && setView("login");
            }}
          />
          <button
            className="btn btn-warning mt-3 returnBtn"
            onClick={() => setView("login")}
          >
            Return to Login
          </button>
        </>
      ) : (
        <>
          <NewUserForm
            onRegistrationSuccess={(res) => {
              res && setView("login");
            }}
          />
          <button
            className="btn btn-warning mt-3 returnBtn"
            onClick={() => setView("login")}
          >
            Return to Login
          </button>
        </>
      )}
    </>
  );
};

export default LoginPage;
