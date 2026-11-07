import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TuiButton, TuiIcon } from '@taiga-ui/core';
import type { Message } from '../../../../../shared/interfaces';
import { DateTimeCustomPipe } from '../../../../../shared/pipes/date-time-custom-pipe';

@Component({
  selector: 'app-chat-search-message-item',
  imports: [TuiIcon, TuiButton, DateTimeCustomPipe],
  templateUrl: './chat-search-message-item.html',
  styleUrl: './chat-search-message-item.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatSearchMessageItem {
  readonly message = input.required<Message>();
}
