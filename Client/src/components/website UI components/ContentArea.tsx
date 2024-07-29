import React from "react";
import NewMessage from "../../components/messages components/newMessage";
import MessageList from "../../components/messages components/messageList";
import { User } from "../../types/userTypes";

interface ContentAreaProps {
  currentContent: string;
  user: User | null;
}

const ContentArea: React.FC<ContentAreaProps> = ({ currentContent, user }) => {
  return (
    <div className="col-md-10">
      <div>
        <h2>{`ברוכים הבאים ${user?.firstName} ${user?.lastName}`}</h2>
        {currentContent === "newMessage" && <NewMessage />}
        {currentContent === "messageHome" && <MessageList />}
        {currentContent === "button2" && <div>button 2</div>}
        {currentContent === "button3" && <div>button 3</div>}
      </div>
    </div>
  );
};

export default ContentArea;
