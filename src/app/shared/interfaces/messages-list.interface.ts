import type { Message } from './message.interface';

export interface MessagesList {
  items: Message[];
  hasMore: boolean;
  nextCursor: string | null;
}
