import { Request, Response } from "express";
import Message from "../models/messageModel";
import _ from "lodash";

// Create a new Message
export const createMessage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const message = new Message(req.body);
    const savedMessage = await message.save();
    res
      .status(201)
      .send({ message: "Message created successfully", data: savedMessage });
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
};

// Get all Messages
export const getMessages = async (
  _req: Request,
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
    res
      .status(200)
      .send({ message: "Message retrieved successfully", data: message });
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
