import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'chats',
    pathMatch: 'full',
  },
  {
    path: 'chats',
    loadComponent: () => import('./shared/pages/app-laylout/app-laylout').then((m) => m.AppLaylout),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/chats/pages/chats-page/chats-page').then((m) => m.ChatsPage),
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/chats/components/chat-empty-state/chat-empty-state').then(
                (m) => m.ChatEmptyState,
              ),
          },
          {
            path: ':chatId',
            loadComponent: () =>
              import('./features/chat/pages/chat-page/chat-page').then((m) => m.ChatPage),
          },
          {
            path: ':chatId/search',
            loadComponent: () =>
              import('./features/chat/pages/search-chat-message-page/search-chat-message-page').then(
                (m) => m.SearchChatMessagePage,
              ),
          },
        ],
      },
    ],
  },
];
