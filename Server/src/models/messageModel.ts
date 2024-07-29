import mongoose, { Document } from "mongoose";

interface IImage {
  data: string;
  mimeType: string;
  name?: string;
}

interface IMessage extends Document {
  title: string;
  body: string;
  mainImage?: IImage;
  imageArray?: IImage[];
  link?: string;
  createdBy?: mongoose.Schema.Types.ObjectId;
  creationDate?: Date;
  editDate?: Date;
  isHidden?: boolean;
}

const imageSchema = new mongoose.Schema({
  data: { type: String, required: true },
  mimeType: { type: String, required: true },
  name: { type: String, default: "" },
});

const messageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  mainImage: { type: imageSchema, default: null },
  imageArray: { type: [imageSchema], default: [] },
  link: { type: String, default: "" },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  creationDate: { type: Date, default: Date.now, immutable: true },
  editDate: { type: Date, default: Date.now },
  isHidden: { type: Boolean, default: false },
});

// Middleware to update editDate before saving
messageSchema.pre("save", function (next) {
  if (this.isModified()) {
    this.editDate = new Date();
  }
  next();
});

const Message = mongoose.model<IMessage>("Message", messageSchema);

export default Message;
