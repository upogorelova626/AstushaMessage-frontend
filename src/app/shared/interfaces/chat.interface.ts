export enum ChatType {
  Private = 'PRIVATE',
  Group = 'GROUP',
}

export interface ChatUser {
  id: string;
  login: string;
  firstName: string | null;
  lastName: string | null;
  avatarUrl: string | null;
}

export interface ChatParticipant {
  userId: string;
  user: ChatUser | null;
}

export interface CreateChat {
  userId: string;
}

export interface GetChatRequest {
  chatId: string;
}

export interface Chat {
  id: string;
  type: ChatType;
  title: string | null;
  createdAt: string;
  updatedAt: string;
  participants: ChatParticipant[];
}
