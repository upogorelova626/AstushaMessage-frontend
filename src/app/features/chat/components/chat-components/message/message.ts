import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { TuiMessage } from '@taiga-ui/kit';
import type { Message } from '../../../../../shared/interfaces';
import { CurrentUserService } from '../../../../../shared/services/current-user.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'app-message',
  imports: [TuiMessage, DatePipe, TuiIcon],
  templateUrl: './message.html',
  styleUrl: './message.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageItem {
  private readonly currentUserService = inject(CurrentUserService);

  readonly message = input.required<Message>();

  protected readonly currentUser = toSignal(this.currentUserService.currentUser$);
}
