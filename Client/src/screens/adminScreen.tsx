import React from 'react';

const AdminScreen: React.FC = () => {
  return (
    <div className="rtl">
      {/* Top Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">
          CCGM
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
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
              <a className="nav-link" href="#">
                Tab 3
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container-fluid">
        <div className="row">
          {/* Right Sidebar */}
          <div className="col-md-2">
            <div className="btn-group-vertical float-right">
              <button type="button" className="btn btn-primary">
                Button 1
              </button>
              <button type="button" className="btn btn-primary">
                Button 2
              </button>
              <button type="button" className="btn btn-primary">
                Button 3
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="col-md-10">
            <div>Content goes here</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminScreen;