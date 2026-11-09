import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, model } from '@angular/core';
import { TuiMessage } from '@taiga-ui/kit';
import type { Message } from '../../../../../shared/interfaces';
import { CurrentUserService } from '../../../../../shared/services/current-user.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { TuiIcon } from '@taiga-ui/core';
import { MessageActionsButton } from '../../message-actions-button/message-actions-button';
import { TuiHovered } from '@taiga-ui/cdk';

@Component({
  selector: 'app-message',
  imports: [TuiMessage, DatePipe, TuiIcon, MessageActionsButton, TuiHovered],
  templateUrl: './message.html',
  styleUrl: './message.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageItem {
  private readonly currentUserService = inject(CurrentUserService);

  readonly message = input.required<Message>();
  protected readonly isHovered = model<boolean>(false);
  protected readonly isMenuOpen = model<boolean>(false);

  protected readonly currentUser = toSignal(this.currentUserService.currentUser$);
}
