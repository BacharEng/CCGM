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
  const response = await apiInstance.post<MessageResponse>(
    "/messages",
    messageData
  );
  return response.data;
};

const getMessages = async (): Promise<IMessage[]> => {
  const response = await apiInstance.get<IMessage[]>("/messages");
  return response.data;
};

const getMessageById = async (id: string): Promise<IMessage> => {
  const response = await apiInstance.get<IMessage>(`/messages/${id}`);
  return response.data;
};

const updateMessageById = async (
  id: string,
  messageData: UpdateMessageRequest
): Promise<MessageResponse> => {
  const response = await apiInstance.put<MessageResponse>(
    `/messages/${id}`,
    messageData
  );
  return response.data;
};

const deleteMessageById = async (id: string): Promise<void> => {
  await apiInstance.delete(`/messages/${id}`);
};

export const messageService = {
  createMessage,
  getMessages,
  getMessageById,
  updateMessageById,
  deleteMessageById,
};
