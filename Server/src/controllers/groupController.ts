import { Request, Response } from "express";
import Group from "../models/groupModel";
import _ from "lodash";

export const createGroup = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const group = new Group(req.body);
    const savedGroup = await group.save();
    res
      .status(201)
      .json({ message: "Group created successfully", group: savedGroup });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getGroups = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const groups = await Group.find();
    res.status(200).json({ message: "Groups retrieved successfully", groups });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getGroupById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      res.status(404).json({ error: "Group not found" });
      return;
    }
    res.status(200).json({ message: "Group retrieved successfully", group });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateGroupById = async (
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

    const originalGroup = await Group.findById(req.params.id);
    if (!originalGroup) {
      res.status(404).json({ error: "Group not found" });
      return;
    }

    // Pick only the fields from the original document that are present in the request body
    const originalDataToCompare = _.pick(
      originalGroup.toObject(),
      _.keys(req.body)
    );
    const isSameData = _.isEqual(req.body, originalDataToCompare);
    if (isSameData) {
      res
        .status(400)
        .json({ error: "No changes detected, data is the same as existing" });
      return;
    }

    const updatedGroup = await Group.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedGroup) {
      res.status(404).json({ error: "Group not found" });
      return;
    }

    const updatedFields = _.reduce(
      req.body,
      (result: any, value: any, key: string) => {
        if (!_.isEqual(value, (originalGroup as any)[key])) {
          result[key] = value;
        }
        return result;
      },
      {}
    );

    res
      .status(200)
      .json({ message: "Group updated successfully", updatedFields });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteGroupById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deletedGroup = await Group.findByIdAndDelete(req.params.id);
    if (!deletedGroup) {
      res.status(404).json({ error: "Group not found" });
      return;
    }
    res.status(200).json({ message: "Group deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
