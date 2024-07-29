import { Request, Response } from "express";
import Message from "../models/messageModel";
import _ from "lodash";
import { storage } from "../firebaseConfig"; // Import Firebase configuration
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Helper function to upload a file to Firebase Storage
const uploadFileToFirebase = async (
  fileBuffer: Buffer,
  fileName: string,
  mimeType: string
): Promise<string> => {
  const storageRef = ref(storage, fileName);

  await uploadBytes(storageRef, fileBuffer, {
    contentType: mimeType,
  });

  return getDownloadURL(storageRef);
};

// Create a new Message
export const createMessage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("Request body:", req.body);

    const { title, body, link, createdBy, isHidden, mainImage, imageArray } =
      req.body;

    // Validate required fields
    if (!title || !body || !createdBy) {
      res
        .status(400)
        .send({ error: "Title, body, and createdBy are required" });
      return;
    }

    let mainImageUrl = "";
    const imageUrls: string[] = [];

    // Upload mainImage if it exists
    if (mainImage) {
      const mainImageBuffer = Buffer.from(mainImage.data, "base64");
      mainImageUrl = await uploadFileToFirebase(
        mainImageBuffer,
        `${Date.now()}_mainImage`,
        mainImage.mimeType
      );
      console.log("Uploaded main image URL:", mainImageUrl);
    }

    // Upload images in imageArray if they exist
    if (imageArray && imageArray.length > 0) {
      for (const image of imageArray) {
        const imageBuffer = Buffer.from(image.data, "base64");
        const imageUrl = await uploadFileToFirebase(
          imageBuffer,
          `${Date.now()}_${image.name}`,
          image.mimeType
        );
        console.log("Uploaded image URL:", imageUrl);
        imageUrls.push(imageUrl);
      }
    }

    const message = new Message({
      title,
      body,
      mainImage: mainImageUrl,
      imageArray: imageUrls,
      link,
      createdBy,
      isHidden,
    });

    const savedMessage = await message.save();
    console.log("Saved message:", savedMessage);
    res
      .status(201)
      .send({ message: "Message created successfully", data: savedMessage });
  } catch (error: any) {
    console.error("Error creating message:", error);
    res.status(400).send({ error: error.message });
  }
};

// Get all Messages
export const getMessages = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const messages = await Message.find();
    res
      .status(200)
      .send({ message: "Messages retrieved successfully", data: messages });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

// Get a Message by ID
export const getMessageById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      res.status(404).send({ error: "Message not found" });
      return;
    }

    // Include image URLs in the response
    const messageWithImages = {
      ...message.toObject(),
      imageArray: message.imageArray || [],
    };

    res.status(200).send({
      message: "Message retrieved successfully",
      data: messageWithImages,
    });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

// Update a Message by ID
export const updateMessageById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (_.isEmpty(req.body)) {
      res
        .status(400)
        .json({ error: "Request body is empty, nothing to update" });
      return;
    }

    const originalMessage = await Message.findById(req.params.id);
    if (!originalMessage) {
      res.status(404).json({ error: "Message not found" });
      return;
    }

    // Pick only the fields from the original document that are present in the request body
    const originalDataToCompare = _.pick(
      originalMessage.toObject(),
      _.keys(req.body)
    );
    const isSameData = _.isEqual(req.body, originalDataToCompare);
    if (isSameData) {
      res
        .status(400)
        .json({ error: "No changes detected, data is the same as existing" });
      return;
    }

    const updatedMessage = await Message.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedMessage) {
      res.status(404).json({ error: "Message not found" });
      return;
    }

    const updatedFields = _.reduce(
      req.body,
      (result: any, value: any, key: string) => {
        if (!_.isEqual(value, (originalMessage as any)[key])) {
          result[key] = value;
        }
        return result;
      },
      {}
    );

    res
      .status(200)
      .json({ message: "Message updated successfully", updatedFields });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a Message by ID
export const deleteMessageById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      res.status(404).send({ error: "Message not found" });
      return;
    }
    res.status(200).send({ message: "Message deleted successfully" });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};
