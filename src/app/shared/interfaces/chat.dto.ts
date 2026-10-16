export enum ChatType {
  Private = 'PRIVATE',
  Group = 'GROUP',
}

export interface ChatParticipant {
  chatId: string;
  userId: string;
}

export interface CreateChat {
  userId: string;
}

export interface Chat {
  id: string;
  type: ChatType;
  title: null | string;
  privateKey: string;
  createdAt: string;
  updatedAt: string;
  participants: ChatParticipant[];
}
