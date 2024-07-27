import mongoose, { Document } from "mongoose";

interface IWorkingHours {
  day: string;
  open: string;
  close: string;
}

interface IMatnas extends Document {
  name: string;
  link: string;
  address: string;
  groups: mongoose.Schema.Types.ObjectId[];
  contactName: string;
  description: string;
  contactNumber: string;
  email: string;
  workingHours: IWorkingHours[];
  location?: {
    type: "Point";
    coordinates: [number, number];
  };
}

const workingHoursSchema = new mongoose.Schema({
  day: { type: String, required: true },
  open: { type: String, required: true },
  close: { type: String, required: true },
});

const matnasSchema = new mongoose.Schema({
  name: { type: String, required: true },
  link: { type: String, required: false },
  address: { type: String, required: true },
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }],
  contactName: { type: String, required: true },
  description: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true },
  workingHours: { type: [workingHoursSchema], required: false },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: false,
    },
    coordinates: {
      type: [Number],
      required: false,
    },
  },
});

// Create a 2dsphere index on the location field
matnasSchema.index({ location: "2dsphere" });

const Matnas = mongoose.model<IMatnas>("Matnas", matnasSchema, "matnasim");

export default Matnas;
