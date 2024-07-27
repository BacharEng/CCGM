import { Request, Response } from "express";
import Matnas from "../models/matnasimModel";
import _ from "lodash";

export const createMatnas = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const matnas = new Matnas(req.body);
    const savedMatnas = await matnas.save();
    res
      .status(201)
      .json({ message: "Matnas created successfully", data: savedMatnas });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getMatnasim = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const matnasim = await Matnas.find();
    res
      .status(200)
      .json({ message: "Matnasim retrieved successfully", data: matnasim });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getMatnasById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const matnas = await Matnas.findById(req.params.id);
    if (!matnas) {
      res.status(404).json({ error: "Matnas not found" });
      return;
    }
    res
      .status(200)
      .json({ message: "Matnas retrieved successfully", data: matnas });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateMatnasById = async (
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

    const originalMatnas = await Matnas.findById(req.params.id);
    if (!originalMatnas) {
      res.status(404).json({ error: "Matnas not found" });
      return;
    }

    // Pick only the fields from the original document that are present in the request body
    const originalDataToCompare = _.pick(
      originalMatnas.toObject(),
      _.keys(req.body)
    );
    const isSameData = _.isEqual(req.body, originalDataToCompare);
    if (isSameData) {
      res
        .status(400)
        .json({ error: "No changes detected, data is the same as existing" });
      return;
    }

    const updatedMatnas = await Matnas.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedMatnas) {
      res.status(404).json({ error: "Matnas not found" });
      return;
    }

    const updatedFields = _.reduce(
      req.body,
      (result: any, value: any, key: string) => {
        if (!_.isEqual(value, (originalMatnas as any)[key])) {
          result[key] = value;
        }
        return result;
      },
      {}
    );

    res
      .status(200)
      .json({ message: "Matnas updated successfully", updatedFields });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteMatnasById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deletedMatnas = await Matnas.findByIdAndDelete(req.params.id);
    if (!deletedMatnas) {
      res.status(404).json({ error: "Matnas not found" });
      return;
    }
    res.status(200).json({ message: "Matnas deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
