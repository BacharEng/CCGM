import { ObjectId } from "bson";

export interface IMessage {
  _id: string;
  title: string;
  body: string;
  mainImage: string;
  imageArray: string[];
  link: string;
  createdBy: ObjectId;
  creationDate: Date;
  editDate: Date;
  isHidden: boolean;
}

export interface CreateMessageRequest {
  title: string;
  body: string;
  mainImage: string;
  imageArray: string[];
  link: string;
  createdBy: ObjectId;
}

export interface UpdateMessageRequest {
  title?: string;
  body?: string;
  mainImage?: string;
  imageArray?: string[];
  link?: string;
  isHidden?: boolean;
}

export interface MessageResponse {
  success: boolean;
  message: IMessage;
}
