import React from "react";
import styles from "./message.module.css";

interface MessageItemProps {
  message: {
    _id: string;
    title: string;
    mainImage: string;
    body: string;
    imageArray: string[];
  };
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  if (!message) {
    return <div>No message found</div>;
  }

  return (
    <div className={styles.messageContainer}>
      <h1 className={styles.title} title={message.title}>
        {message.title}
      </h1>
      <div className={styles.content}>
        <img src={message.mainImage} alt="Main" className={styles.mainImage} />
        <p className={styles.body} title={message.body}>
          {message.body}
        </p>
      </div>
      <div className={styles.imageArray}>
        {message.imageArray.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            className={styles.image}
          />
        ))}
      </div>
    </div>
  );
};

export default MessageItem;
