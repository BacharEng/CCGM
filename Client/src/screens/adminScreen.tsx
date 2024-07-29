import React, { useEffect, useState } from "react";
import TopBar from "../components/website UI components/TopBar";
import Sidebar from "../components/website UI components/SideBar";
import ContentArea from "../components/website UI components/ContentArea";
import useUserStore from "../store/useUserStore";

const AdminScreen: React.FC = () => {
  const { user: localUser, token } = useUserStore();
  const [currentContent, setCurrentContent] = useState<string>("messageHome"); // Set default content to "newMessage"

  useEffect(() => {
    if (import.meta.env.DEV) {
      //console.log("User:", localUser);
      //console.log("Token:", token);
    }
  }, [localUser, token]);

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
      <TopBar setCurrentContent={setCurrentContent} />
      <div className="container-fluid">
        <div className="row">
          <Sidebar
            onNewMessageClick={handleNewMessageClick}
            onButton2Click={handleButton2Click}
            onButton3Click={handleButton3Click}
          />
          <ContentArea currentContent={currentContent} user={localUser} />
        </div>
      </div>
    </div>
  );
};

export default AdminScreen;
