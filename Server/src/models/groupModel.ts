import mongoose, { Document } from "mongoose";

interface IGroup extends Document {
  groupLocation: mongoose.Schema.Types.ObjectId;
  groupUsers: string[];
  groupDate: Date;
  groupInstructor: string;
  isFull: boolean;
  isDone: boolean;
  groupCreationDate: Date;
  updateDate: Date;
}

const groupSchema = new mongoose.Schema({
  groupLocation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Matnas",
    required: true,
  },
  groupUsers: { type: [String], required: true },
  groupDate: { type: Date, required: true },
  groupInstructor: { type: String, required: true },
  isFull: { type: Boolean, default: false },
  isDone: { type: Boolean, default: false },
  groupCreationDate: { type: Date, default: Date.now, immutable: true },
  updateDate: { type: Date, default: Date.now },
});

// Middleware to update the updateDate field before saving
groupSchema.pre("save", function (next) {
  this.updateDate = new Date();
  next();
});

const Group = mongoose.model<IGroup>("Group", groupSchema);

export default Group;
