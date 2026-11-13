export enum PinMessageDuration {
  OneDay = '1d',
  SevenDays = '7d',
  ThirtyDays = '30d',
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  text: string;

  isPinned: boolean;
  pinnedAt: string | null;
  pinnedUntil: string | null;
  pinnedById: string | null;

  createdAt: string;
  editedAt: string | null;
  deletedAt: string | null;
}

export interface NewMessagePayload {
  text: string;
}

export interface PinMessagePayload {
  duration: PinMessageDuration;
}
