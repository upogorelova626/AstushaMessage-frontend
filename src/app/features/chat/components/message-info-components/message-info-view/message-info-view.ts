import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import type { Message } from '../../../../../shared/interfaces';
import { MessageItem } from '../../chat-components/message/message';

@Component({
  selector: 'app-message-info-view',
  imports: [MessageItem],
  templateUrl: './message-info-view.html',
  styleUrl: './message-info-view.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageInfoView {
  readonly message = input.required<Message | null>();
  readonly isActionsButtonsNeeded = signal(false);
}
