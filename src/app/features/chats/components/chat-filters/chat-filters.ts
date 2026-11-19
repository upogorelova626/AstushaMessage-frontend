import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';
import { ChatFolderMenuButton } from '../chat-folder-menu-button/chat-folder-menu-button';

@Component({
  selector: 'app-chat-filters',
  imports: [TuiButton, ChatFolderMenuButton],
  templateUrl: './chat-filters.html',
  styleUrl: './chat-filters.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatFilters {}
