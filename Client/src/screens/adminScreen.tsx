import React, { useEffect, useState } from "react";
import { User } from "../types/userTypes";
import NewMessage from "../components/messages components/newMessage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AdminScreenProps {
  localUser: User | null;
  handleLogout: () => void;
}

const AdminScreen: React.FC<AdminScreenProps> = ({
  localUser,
  handleLogout,
}) => {
  const [currentContent, setCurrentContent] = useState<string>("");

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.log("User:", localUser);
      console.log("Token:", localUser?.authenticationToken);
    }
  }, [localUser]);

  const handleNewMessageClick = () => {
    setCurrentContent("newMessage");
  };

  const handleButton2Click = () => {
    setCurrentContent("button2");
  };

  const handleButton3Click = () => {
    setCurrentContent("button3");
  };

  return (
    <div className="rtl">
      <ToastContainer />
      {/* Top Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="collapse navbar-collapse order-2" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Tab 1
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Tab 2
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link logout-tab"
                href="#"
                onClick={handleLogout}
              >
                יציאה מהמשתמש
              </a>
            </li>
          </ul>
        </div>
        <a className="navbar-brand order-1" href="#">
          CCGM
        </a>
        <button
          className="navbar-toggler order-3"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </nav>

      {/* Main Content */}
      <div className="container-fluid">
        <div className="row">
          {/* Right Sidebar */}
          <div className="col-md-2">
            <div className="btn-group-vertical float-right">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleNewMessageClick}
              >
                הודעה חדשה
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleButton2Click}
              >
                Button 2
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleButton3Click}
              >
                Button 3
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="col-md-10">
            <div>
              <h2>{`ברוכים הבאים ${localUser?.firstName} ${localUser?.lastName}`}</h2>
              {currentContent === "newMessage" && <NewMessage />}
              {currentContent === "button2" && <div>button 2</div>}
              {currentContent === "button3" && <div>button 3</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminScreen;
