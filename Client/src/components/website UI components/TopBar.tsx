import React from "react";
import useUserStore from "../../store/useUserStore";

const TopBar: React.FC = () => {
  const { logout: handleLogout } = useUserStore();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand order-1" href="#">
        CCGM
      </a>
      <button
        className="navbar-toggler order-2"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse order-3" id="navbarNav">
        <ul className="navbar-nav ml-auto">
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
            <a className="nav-link logout-tab" href="#" onClick={handleLogout}>
              יציאה מהמשתמש
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default TopBar;