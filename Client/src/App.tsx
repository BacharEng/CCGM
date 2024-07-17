import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthPage from "./components/AuthPage";
import "./App.css";

const App = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <h1>React App</h1>
            <AuthPage />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default App;
