import React from "react";

interface SidebarProps {
  onNewMessageClick: () => void;
  onButton2Click: () => void;
  onButton3Click: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  onNewMessageClick,
  onButton2Click,
  onButton3Click,
}) => {
  return (
    <div className="col-md-2">
      <div className="btn-group-vertical float-right">
        <button type="button" className="btn btn-primary" onClick={onNewMessageClick}>
          הודעה חדשה
        </button>
        <button type="button" className="btn btn-primary" onClick={onButton2Click}>
          Button 2
        </button>
        <button type="button" className="btn btn-primary" onClick={onButton3Click}>
          Button 3
        </button>
      </div>
    </div>
  );
};

export default Sidebar;