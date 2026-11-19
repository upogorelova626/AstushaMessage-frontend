import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  TuiCheckbox,
  TuiInput,
  TuiTextfield,
  TuiButton,
  TuiScrollbar,
  type TuiDialogContext,
} from '@taiga-ui/core';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';

import { CurrentUserService } from '../../../../shared/services/current-user.service';
import { ChatPreview } from '../../components/chat-preview/chat-preview';
import { ChatsStoreService } from '../../services/chats-store.service';

import { injectContext } from '@taiga-ui/polymorpheus';
import type { Chat } from '../../../../shared/interfaces';
import { SelectedChatChip } from '../../components/selected-chat-chip/selected-chat-chip';

@Component({
  selector: 'app-select-chats-for-list',
  imports: [
    TuiTextfield,
    TuiInput,
    TuiCheckbox,
    ChatPreview,
    ReactiveFormsModule,
    TuiButton,
    TuiScrollbar,
    SelectedChatChip,
  ],
  templateUrl: './select-chats-for-list.html',
  styleUrl: './select-chats-for-list.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectChatsForList {
  private readonly chatsStoreService = inject(ChatsStoreService);
  private readonly currentUserService = inject(CurrentUserService);

  private readonly currentUser = toSignal(this.currentUserService.currentUser$);
  protected readonly addedChats = signal<Chat[]>([]);

  protected readonly context = injectContext<TuiDialogContext<Chat[], void>>();

  protected readonly chats = this.chatsStoreService.chats;

  protected readonly filterInput = new FormControl('', {
    nonNullable: true,
  });

  protected readonly filterValue = toSignal(
    this.filterInput.valueChanges.pipe(
      map((value) => value.trim().toLowerCase()),
      debounceTime(300),
      distinctUntilChanged(),
    ),
    { initialValue: '' },
  );

  protected readonly filteredChats = computed(() => {
    const filterValue = this.filterValue();

    if (!filterValue) {
      return this.chats();
    }

    return this.chats().filter((chat) => {
      const titleMatches = chat.title?.toLowerCase().includes(filterValue);

      const participantMatches = chat.participants.some((participant) => {
        if (participant.userId === this.currentUser()?.id) {
          return false;
        }

        const user = participant.user;

        return [
          user?.firstName,
          user?.lastName,
          user?.login,
          [user?.firstName, user?.lastName].filter(Boolean).join(' '),
        ].some((value) => value?.toLowerCase().includes(filterValue));
      });

      return titleMatches || participantMatches;
    });
  });

  protected toggleChat(chat: Chat): void {
    this.addedChats.update((chats) =>
      chats.includes(chat) ? chats.filter((id) => id !== chat) : [...chats, chat],
    );
  }

  protected save(): void {
    this.context.completeWith(this.addedChats());
  }
}
