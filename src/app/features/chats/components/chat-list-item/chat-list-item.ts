import { ChangeDetectionStrategy, Component, inject, Injector, input, signal } from '@angular/core';
import { TuiActiveZone, TuiObscured } from '@taiga-ui/cdk';
import { TuiAppearance, TuiButton, TuiDataList, TuiDropdown, TuiOption } from '@taiga-ui/core';
import type { ChatList } from '../../../../shared/interfaces';
import { ChatsStoreService } from '../../services/chats-store.service';
import { ChatFolderService } from '../../../../shared/services/chat-folder.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { catchError, EMPTY } from 'rxjs';
import { SideBarService } from '../../../../shared/drawer/sidebar.service';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { ChatFolderFormPage } from '../../pages/chat-folder-form-page/chat-folder-form-page';

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
  private readonly sidebarService = inject(SideBarService);

  private readonly injector = inject(Injector);

  readonly list = input.required<ChatList>();

  protected readonly chatFilter = this.chatsStoreService.chatsFilter;
  protected readonly open = signal(false);

  protected readonly actions: readonly Action[] = [
    {
      title: 'Редактировать',
      icon: '@tui.pencil',
      action: () => this.editFolder(),
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
      .deleteChatsList(folderId)
      .pipe(
        catchError(() => {
          this.notificationService.openNegativeAlert('Не удалось удалить список');
          return EMPTY;
        }),
      )
      .subscribe(() => this.chatsStoreService.loadChatsAndFolders());
  }

  private editFolder(): void {
    this.sidebarService
      .open$<ChatFolderFormPage, { folderId: string }>(
        new PolymorpheusComponent(ChatFolderFormPage, this.injector),
        {
          overlay: false,
          rounded: false,
          offset: false,
          closeOnClickOutside: true,
          direction: 'start',
        },
        { folder: this.list() },
      )
      .pipe()
      .subscribe();
  }
}
