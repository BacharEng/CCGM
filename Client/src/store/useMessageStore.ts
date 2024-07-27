import { create } from "zustand";
import { messageService } from "../services/messageService";
import {
  IMessage,
  CreateMessageRequest,
  UpdateMessageRequest,
} from "../types/messageTypes";

interface MessageStore {
  messages: IMessage[];
  message: IMessage | null;
  loading: boolean;
  error: string | null;
  fetchMessages: () => Promise<void>;
  fetchMessageById: (id: string) => Promise<void>;
  createMessage: (messageData: CreateMessageRequest) => Promise<void>;
  updateMessage: (
    id: string,
    messageData: UpdateMessageRequest
  ) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
}

export const useMessageStore = create<MessageStore>((set) => ({
  messages: [],
  message: null,
  loading: false,
  error: null,

  fetchMessages: async () => {
    set({ loading: true, error: null });
    try {
      const data = await messageService.getMessages();
      set({ messages: data });
    } catch (err: any) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  fetchMessageById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const data = await messageService.getMessageById(id);
      set({ message: data });
    } catch (err: any) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  createMessage: async (messageData: CreateMessageRequest) => {
    set({ loading: true, error: null });
    try {
      const data = await messageService.createMessage(messageData);
      set((state) => ({
        messages: [...state.messages, data as unknown as IMessage],
      }));
    } catch (err: any) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  updateMessage: async (id: string, messageData: UpdateMessageRequest) => {
    set({ loading: true, error: null });
    try {
      const data = await messageService.updateMessageById(id, messageData);
      set((state) => ({
        messages: state.messages.map((msg) =>
          msg._id === id ? { ...msg, ...data } : msg
        ),
      }));
    } catch (err: any) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  deleteMessage: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await messageService.deleteMessageById(id);
      set((state) => ({
        messages: state.messages.filter((msg) => msg._id !== id),
      }));
    } catch (err: any) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },
}));
