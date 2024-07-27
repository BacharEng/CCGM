import React, { useState } from "react";
import { useMessageStore } from "../../store/useMessageStore";
import useUserStore from "../../store/useUserStore";
import { CreateMessageRequest } from "../../types/messageTypes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewMessage: React.FC = () => {
  const { createMessage, loading, error } = useMessageStore();
  const { user } = useUserStore(); // Get user data from Zustand
  const [messageData, setMessageData] = useState<
    Omit<CreateMessageRequest, "createdBy">
  >({
    title: "",
    body: "",
    mainImage: "",
    imageArray: [],
    link: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setMessageData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      console.error("User not logged in");
      return;
    }
    const messageToCreate: CreateMessageRequest = {
      ...messageData,
      createdBy: user._id,
    };
    try {
      await createMessage(messageToCreate);
      setMessageData({
        title: "",
        body: "",
        mainImage: "",
        imageArray: [],
        link: "",
      }); // Reset form after submission
      toast.success("Operation was successful!");
    } catch (err) {
      toast.error("Operation failed. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create New Message</h2>
      {error && <div className="alert alert-danger">{error}</div>}
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
            value={messageData.title}
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
            value={messageData.body}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="mainImage" className="form-label">
            Main Image
          </label>
          <input
            type="text"
            className="form-control"
            id="mainImage"
            name="mainImage"
            value={messageData.mainImage}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="imageArray" className="form-label">
            Image Array (comma separated URLs)
          </label>
          <input
            type="text"
            className="form-control"
            id="imageArray"
            name="imageArray"
            value={messageData.imageArray.join(", ")}
            onChange={(e) =>
              handleChange({
                ...e,
                target: {
                  ...e.target,
                  value: e.target.value
                    .split(",")
                    .map((url) => url.trim())
                    .join(", "),
                },
              })
            }
          />
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
            value={messageData.link}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Saving..." : "Save Message"}
        </button>
      </form>
    </div>
  );
};

export default NewMessage;
