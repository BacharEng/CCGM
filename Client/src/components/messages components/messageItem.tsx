import React, { useEffect } from "react";
import { useMessageStore } from "../../store/useMessageStore";
import styles from "./MessageDisplay.module.css";

interface MessageItemProps {
  id: string; // MongoDB ObjectID as a string
}

const MessageItem: React.FC<MessageItemProps> = ({ id }) => {
  const { message, loading, error, fetchMessageById } = useMessageStore();

  useEffect(() => {
    if (id) {
      fetchMessageById(id);
    }
  }, [id, fetchMessageById]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!message) {
    return <div>No message found</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{message.title}</h1>
      <div className={styles.content}>
        <img src={message.mainImage} alt="Main" className={styles.mainImage} />
        <p className={styles.body}>{message.body}</p>
      </div>
      <div className={styles.imageArray}>
        {message.imageArray.map((image, index) => (
          <img key={index} src={image} alt={`Image ${index + 1}`} className={styles.image} />
        ))}
      </div>
    </div>
  );
};

export default MessageItem;