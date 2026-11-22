import type { Chat } from './chat.interface';

export interface CreateNewChatsList {
  name: string;
  chatIds: string[];
}

export type EditChatsList = CreateNewChatsList;

export interface RenameFolder {
  name: string;
}

export interface ChatList {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  items: {
    chat: Chat;
  }[];
}
