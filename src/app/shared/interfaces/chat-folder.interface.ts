export interface CreateNewFolder {
  name: string;
  chatIds: string[];
}

export interface ChatFolder {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  items: { chatId: string }[];
}
