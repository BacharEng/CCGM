import React, { useEffect, useCallback } from "react";
import { useMessageStore } from "../../store/useMessageStore";
import MessageItem from "./messageItem";
import messageStyles from "./message.module.css";

const MessageList: React.FC = () => {
  const { messages, loading, error, fetchMessages } = useMessageStore();

  const memoizedFetchMessages = useCallback(() => {
    fetchMessages();
  }, [fetchMessages]);

  useEffect(() => {
    memoizedFetchMessages();
  }, [memoizedFetchMessages]);

  useEffect(() => {
    // console.log("Messages:", messages);
    // console.log("Type of messages:", typeof messages);
    // console.log("Is messages an array?", Array.isArray(messages));
  }, [messages]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return <div>No messages found</div>;
  }

  return (
    <div className={`container ${messageStyles.container}`}>
      <div className="row">
        {messages.map((message) => (
          <div key={message._id} className="col-12 col-sm-6 col-lg-3 mb-4">
            <div className={messageStyles.messageContainer}>
              <MessageItem message={message} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageList;
