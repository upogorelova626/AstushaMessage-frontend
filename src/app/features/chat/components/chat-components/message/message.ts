import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, model } from '@angular/core';
import { TuiMessage, TuiSkeleton } from '@taiga-ui/kit';
import type { Message } from '../../../../../shared/interfaces';
import { CurrentUserService } from '../../../../../shared/services/current-user.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { TuiIcon } from '@taiga-ui/core';
import { MessageActionsButton } from '../../message-actions-button/message-actions-button';
import { TuiHovered } from '@taiga-ui/cdk';
import { ActionsWithMessageService } from '../../../services/actions-with-message.service';

@Component({
  selector: 'app-message',
  imports: [TuiMessage, DatePipe, TuiIcon, MessageActionsButton, TuiHovered, TuiSkeleton],
  templateUrl: './message.html',
  styleUrl: './message.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageItem {
  private readonly currentUserService = inject(CurrentUserService);
  private readonly actionsWithMessageService = inject(ActionsWithMessageService);

  readonly message = input.required<Message>();
  readonly isActionsButtonsNeeded = input<boolean>(true);
  protected readonly isHovered = model<boolean>(false);
  protected readonly isMenuOpen = model<boolean>(false);
  protected readonly isLoading = this.actionsWithMessageService.isLoading;

  protected readonly currentUser = toSignal(this.currentUserService.currentUser$);
}
