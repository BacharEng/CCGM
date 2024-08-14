import React, { useState } from "react";
import { useMessageStore } from "../../store/useMessageStore";
import useUserStore from "../../store/useUserStore";
import { CreateMessageRequest } from "../../types/messageTypes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const allowedCharacters = /^[^<>/]*$/;

const NewMessage: React.FC = () => {
  const { createMessage, loading, error } = useMessageStore();
  const { user } = useUserStore();
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
    if (allowedCharacters.test(value)) {
      setMessageData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      toast.error("Invalid characters detected. Please remove them.");
    }
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
            //console.log(`File loaded: ${file.name}`);
            resolve(reader.result as string);
          };
        });
      });

      Promise.all(fileReaders).then((urls) => {
        if (field === "mainImage") {
          setMessageData((prevData) => ({
            ...prevData,
            mainImage: urls[0], // Only one main image
          }));
          //console.log(`Main image set: ${urls[0]}`);
        } else {
          setMessageData((prevData) => ({
            ...prevData,
            imageArray: urls, // Multiple images
          }));
          //console.log(`Image array set: ${urls}`);
        }
      });
    }
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
    //console.log("Submitting message:", messageToCreate); // Log the message being submitted
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
            type="file"
            className="form-control"
            id="mainImage"
            name="mainImage"
            onChange={(e) => handleFileChange(e, "mainImage")}
            accept="image/*"
          />
          {messageData.mainImage && (
            <img
              src={messageData.mainImage}
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
          <div style={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}>
            {messageData.imageArray.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Preview ${index}`}
                style={{ width: "100px", height: "100px", marginRight: "10px" }}
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
