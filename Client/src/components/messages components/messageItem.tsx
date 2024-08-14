import React, { useState } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import styles from "./message.module.css";
import { useMessageStore } from "../../store/useMessageStore";
import NewMessageModal from "./NewMessageModal"; // Import the modal component

import { UpdateMessageRequest } from "../../types/messageTypes";

interface MessageItemProps {
  message: {
    _id: string;
    title: string;
    mainImage: string;
    body: string;
    imageArray: string[];
    link: string;
  };
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const { deleteMessage, updateMessage, fetchMessages } = useMessageStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(message);

  const handleDelete = () => {
    deleteMessage(currentMessage._id);
    fetchMessages(); // Re-fetch messages after deletion
  };

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleUpdate = async (updatedMessage: UpdateMessageRequest) => {
    await updateMessage(currentMessage._id, updatedMessage);
    setCurrentMessage({ ...currentMessage, ...updatedMessage });
    setIsModalOpen(false);
    fetchMessages(); // Re-fetch messages after update
  };

  if (!currentMessage) {
    return <div>No message found</div>;
  }

  return (
    <div className={styles.messageContainer}>
      <h1 className={styles.title} title={currentMessage.title}>
        {currentMessage.title}
      </h1>
      <div className={styles.content}>
        <img
          src={currentMessage.mainImage}
          alt="Main"
          className={styles.mainImage}
        />
        <p className={styles.body} title={currentMessage.body}>
          {currentMessage.body}
        </p>
      </div>
      <div className={styles.imageArray}>
        {currentMessage.imageArray.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            className={styles.image}
          />
        ))}
      </div>
      <div className={styles.icons}>
        <FaTrashAlt className={styles.deleteIcon} onClick={handleDelete} />
        <FaEdit className={styles.editIcon} onClick={handleEdit} />
      </div>
      {isModalOpen && (
        <NewMessageModal
          initialData={currentMessage}
          onClose={() => setIsModalOpen(false)}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
};

export default MessageItem;
