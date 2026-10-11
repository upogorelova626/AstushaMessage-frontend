import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'chats', pathMatch: 'full' },
  {
    path: 'chats',
    loadComponent: () =>
      import('./features/chats/pages/chats-page/chats-page').then((m) => m.ChatsPage),
  },
];
