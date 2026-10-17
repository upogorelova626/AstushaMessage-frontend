import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiIcon } from '@taiga-ui/core';
import { TuiMessage } from '@taiga-ui/kit';

export interface ChatMessage {
  id: string;
  text: string;
  createdAt: string;
  isMine: boolean;
  isRead: boolean;
}

@Component({
  selector: 'app-chat-messages',
  imports: [TuiMessage, TuiIcon, DatePipe],
  templateUrl: './chat-messages.html',
  styleUrl: './chat-messages.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessages {
  MOCK_MESSAGES: ChatMessage[] = [
    {
      id: '1',
      text: 'Привет! Как дела?',
      createdAt: '2026-10-15T10:30:00',
      isMine: false,
      isRead: true,
    },
    {
      id: '2',
      text: 'Привет! Всё отлично, а у тебя?',
      createdAt: '2026-10-15T10:32:00',
      isMine: true,
      isRead: true,
    },
    {
      id: '3',
      text: 'Тоже хорошо! Чем занимаешься?',
      createdAt: '2026-10-15T10:35:00',
      isMine: false,
      isRead: true,
    },
    {
      id: '4',
      text: 'Разрабатываю свой мессенджер на Angular и NestJS 😎',
      createdAt: '2026-10-15T10:36:00',
      isMine: true,
      isRead: true,
    },
    {
      id: '5',
      text: 'Ого, круто! А что уже реализовано?',
      createdAt: '2026-10-15T10:38:00',
      isMine: false,
      isRead: true,
    },
    {
      id: '6',
      text: 'Авторизация, создание чатов, поиск пользователей. Сейчас работаю над сообщениями.',
      createdAt: '2026-10-15T10:40:00',
      isMine: true,
      isRead: true,
    },
    {
      id: '7',
      text: 'Доброе утро! Как продвигается разработка?',
      createdAt: '2026-10-16T09:15:00',
      isMine: false,
      isRead: true,
    },
    {
      id: '8',
      text: 'Привет! Уже сверстал шапку чата, теперь делаю список сообщений.',
      createdAt: '2026-10-16T09:20:00',
      isMine: true,
      isRead: true,
    },
    {
      id: '9',
      text: 'Надо будет ещё WebSocket подключить.',
      createdAt: '2026-10-16T09:22:00',
      isMine: true,
      isRead: true,
    },
    {
      id: '10',
      text: 'Да, без него мессенджер не обойдётся 😄',
      createdAt: '2026-10-16T09:25:00',
      isMine: false,
      isRead: true,
    },
    {
      id: '11',
      text: 'Кстати, завтра покажу, как всё выглядит!',
      createdAt: '2026-10-16T21:45:00',
      isMine: true,
      isRead: false,
    },
    {
      id: '12',
      text: 'Обязательно оцени интерфейс, я очень старался!',
      createdAt: '2026-10-16T21:46:00',
      isMine: true,
      isRead: false,
    },
  ];
}
