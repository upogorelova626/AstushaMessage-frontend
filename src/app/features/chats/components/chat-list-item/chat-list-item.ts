import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { TuiActiveZone, TuiObscured } from '@taiga-ui/cdk';
import { TuiAppearance, TuiButton, TuiDataList, TuiDropdown, TuiOption } from '@taiga-ui/core';
import type { ChatFolder } from '../../../../shared/interfaces';
import { ChatsStoreService } from '../../services/chats-store.service';
import { ChatFolderService } from '../../../../shared/services/chat-folder.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { catchError, EMPTY } from 'rxjs';

interface Action {
  readonly title: string;
  readonly icon: string;
  action?: () => void;
}

@Component({
  selector: 'app-chat-list-item',
  imports: [
    TuiActiveZone,
    TuiAppearance,
    TuiButton,
    TuiDataList,
    TuiDropdown,
    TuiObscured,
    TuiOption,
  ],
  templateUrl: './chat-list-item.html',
  styleUrl: './chat-list-item.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatListItem {
  private readonly chatsStoreService = inject(ChatsStoreService);
  private readonly chatFolderService = inject(ChatFolderService);
  private readonly notificationService = inject(NotificationService);

  readonly list = input.required<ChatFolder>();

  protected readonly chatFilter = this.chatsStoreService.chatsFilter;
  protected readonly open = signal(false);

  protected readonly actions: readonly Action[] = [
    {
      title: 'Переименовать',
      icon: '@tui.pencil',
    },
    {
      title: 'Удалить',
      icon: '@tui.trash',
      action: () => this.deleteFolder(),
    },
  ];

  protected onClick(event: Event): void {
    event.preventDefault();
    this.open.update((open) => !open);
  }

  protected onObscured(obscured: boolean): void {
    if (obscured) {
      this.open.set(false);
    }
  }

  protected onActiveZone(active: boolean): void {
    if (!active) {
      this.open.set(false);
    }
  }

  protected onSelect(action: Action): void {
    this.open.set(false);
    action.action?.();
  }

  protected changeFilterValue(filterValue: string): void {
    this.chatsStoreService.chatsFilter.set(filterValue);
  }

  private deleteFolder(): void {
    const folderId = this.list().id;

    this.chatFolderService
      .deleteFolder(folderId)
      .pipe(
        catchError(() => {
          this.notificationService.openNegativeAlert('Не удалось удалить список');
          return EMPTY;
        }),
      )
      .subscribe(() => this.chatsStoreService.loadChatsAndFolders());
  }
}
