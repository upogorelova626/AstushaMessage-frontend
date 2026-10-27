export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  text: string;

  createdAt: string;
  editedAt: string | null;
  deletedAt: string | null;
}

export interface MessagePayload {
  text: string;
}
