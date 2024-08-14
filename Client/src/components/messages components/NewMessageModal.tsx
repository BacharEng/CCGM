import React, { useState } from "react";
import Modal from "react-modal";
import styles from "./message.module.css";
import { UpdateMessageRequest } from "../../types/messageTypes";

interface NewMessageModalProps {
  initialData: {
    _id: string;
    title: string;
    mainImage: string;
    body: string;
    imageArray: string[];
    link: string;
  };
  onClose: () => void;
  onSave: (updatedMessage: UpdateMessageRequest) => void;
}

const NewMessageModal: React.FC<NewMessageModalProps> = ({
  initialData,
  onClose,
  onSave,
}) => {
  const [updatedMessage, setUpdatedMessage] = useState(initialData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedMessage((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "mainImage" | "imageArray"
  ) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const fileReaders = fileArray.map((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise<string>((resolve) => {
          reader.onload = () => {
            resolve(reader.result as string);
          };
        });
      });

      Promise.all(fileReaders).then((urls) => {
        if (field === "mainImage") {
          setUpdatedMessage((prevData) => ({
            ...prevData,
            mainImage: urls[0], // Only one main image
          }));
        } else {
          setUpdatedMessage((prevData) => ({
            ...prevData,
            imageArray: urls, // Multiple images
          }));
        }
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(updatedMessage);
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      contentLabel="Edit Message"
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <div className="container mt-5">
        <h2>Edit Message</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={updatedMessage.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="body" className="form-label">
              Body
            </label>
            <textarea
              className="form-control"
              id="body"
              name="body"
              value={updatedMessage.body}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="mainImage" className="form-label">
              Main Image
            </label>
            <input
              type="file"
              className="form-control"
              id="mainImage"
              name="mainImage"
              onChange={(e) => handleFileChange(e, "mainImage")}
              accept="image/*"
            />
            {updatedMessage.mainImage && (
              <img
                src={updatedMessage.mainImage}
                alt="Main Preview"
                style={{ width: "100px", height: "100px", marginTop: "10px" }}
              />
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="imageArray" className="form-label">
              Image Array
            </label>
            <input
              type="file"
              className="form-control"
              id="imageArray"
              name="imageArray"
              onChange={(e) => handleFileChange(e, "imageArray")}
              accept="image/*"
              multiple
            />
            <div
              style={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}
            >
              {updatedMessage.imageArray.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Preview ${index}`}
                  style={{
                    width: "100px",
                    height: "100px",
                    marginRight: "10px",
                  }}
                />
              ))}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="link" className="form-label">
              Link
            </label>
            <input
              type="text"
              className="form-control"
              id="link"
              name="link"
              value={updatedMessage.link}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Save Message
          </button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default NewMessageModal;
