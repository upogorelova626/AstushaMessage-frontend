export enum MuteDuration {
  EIGHT_HOURS = 'EIGHT_HOURS',
  ONE_WEEK = 'ONE_WEEK',
  FOREVER = 'FOREVER',
}

export interface ArchiveChatRequest {
  isArchived: boolean;
}

export interface PinChatRequest {
  isPinned: boolean;
}

export interface FavoriteChatRequest {
  isFavorite: boolean;
}

export interface MuteChatRequest {
  isMuted: boolean;
  duration?: MuteDuration;
}
