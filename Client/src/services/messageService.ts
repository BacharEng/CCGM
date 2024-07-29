import apiInstance from "./apiService";
import {
  IMessage,
  CreateMessageRequest,
  UpdateMessageRequest,
  MessageResponse,
} from "../types/messageTypes";

const createMessage = async (
  messageData: CreateMessageRequest
): Promise<MessageResponse> => {
  console.log("Payload being sent to API:", messageData); // Log the request payload
  const response = await apiInstance.post<MessageResponse>(
    "/messages",
    messageData
  );
  console.log("createMessage response:", response); // Log the entire response
  return response.data;
};

const getMessages = async (): Promise<IMessage[]> => {
  const response = await apiInstance.get<{ data: IMessage[] }>("/messages");
  //console.log("getMessages response:", response);
  return response.data.data;
};

const getMessageById = async (id: string): Promise<IMessage> => {
  const response = await apiInstance.get<{ data: IMessage }>(`/messages/${id}`);
  //console.log("getMessageById response:", response.data.data);
  return response.data.data;
};

const updateMessageById = async (
  id: string,
  messageData: UpdateMessageRequest
): Promise<MessageResponse> => {
  const response = await apiInstance.put<MessageResponse>(
    `/messages/${id}`,
    messageData
  );
  //console.log("updateMessageById response:", response);
  return response.data;
};

const deleteMessageById = async (id: string): Promise<void> => {
  const response = await apiInstance.delete(`/messages/${id}`);
  //console.log("deleteMessageById response:", response);
};

export const messageService = {
  createMessage,
  getMessages,
  getMessageById,
  updateMessageById,
  deleteMessageById,
};
