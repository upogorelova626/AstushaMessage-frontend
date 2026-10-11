import { Component } from '@angular/core';
import { ChatSearch } from '../chat-search/chat-search';
import { ChatFilters } from '../chat-filters/chat-filters';
import { Header } from '../header/header';

@Component({
  selector: 'app-chat-list',
  imports: [ChatSearch, ChatFilters, Header],
  templateUrl: './chat-list.html',
  styleUrl: './chat-list.less',
})
export class ChatList {}
