import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { ChatType, type Chat } from '../../../../shared/interfaces';
import { CurrentUserService } from '../../../../shared/services/current-user.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { TuiAvatar } from '@taiga-ui/kit';
import { TuiButtonX } from '@taiga-ui/core';

@Component({
  selector: 'app-selected-chat-chip',
  imports: [TuiAvatar, TuiButtonX],
  templateUrl: './selected-chat-chip.html',
  styleUrl: './selected-chat-chip.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectedChatChip {
  private readonly currentUserService = inject(CurrentUserService);

  private readonly currentUser = toSignal(this.currentUserService.currentUser$);

  readonly chat = input.required<Chat>();
  readonly remove = output<void>();

  protected readonly companion = computed(() => {
    const chat = this.chat();
    const currentUser = this.currentUser();

    if (chat.type !== ChatType.Private || !currentUser) {
      return null;
    }

    return (
      chat.participants.find((participant) => participant.userId !== currentUser.id)?.user ?? null
    );
  });

  protected readonly chatAvatar = computed(() => {
    const user = this.companion();

    return (
      user?.avatarUrl ||
      user?.firstName?.charAt(0).toUpperCase() ||
      user?.lastName?.charAt(0).toUpperCase() ||
      user?.login?.charAt(0).toUpperCase() ||
      null
    );
  });

  protected readonly chatTitle = computed(() => {
    const user = this.companion();

    const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(' ');

    return fullName || user?.login || null;
  });

  protected removeChat(): void {
    this.remove.emit();
  }
}
