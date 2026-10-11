import { Component } from '@angular/core';
import { ChatSearch } from '../chat-search/chat-search';
import { ChatFilters } from '../chat-filters/chat-filters';
import { Header } from '../header/header';
import { ClosedChats } from '../closed-chats/closed-chats';
import { ArchivedChats } from '../archived-chats/archived-chats';

@Component({
  selector: 'app-chat-list',
  imports: [ChatSearch, ChatFilters, Header, ClosedChats, ArchivedChats],
  templateUrl: './chat-list.html',
  styleUrl: './chat-list.less',
})
export class ChatList {}
