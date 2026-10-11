import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Sidebar } from '../../components/sidebar/sidebar';

@Component({
  selector: 'app-chats-page',
  imports: [Sidebar],
  templateUrl: './chats-page.html',
  styleUrl: './chats-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatsPage {}
