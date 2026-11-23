import { ChangeDetectionStrategy, Component, inject, Injector, input, signal } from '@angular/core';
import { TuiDataList, TuiDropdown } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { catchError, EMPTY, finalize, tap, timer } from 'rxjs';

import type { Chat } from '../../../../shared/interfaces';
import { NotificationService } from '../../../../shared/services/notification.service';
import { SideBarService } from '../../../../shared/drawer/sidebar.service';
import { ChatFolderService } from '../../../../shared/services/chat-folder.service';
import { ChatsStoreService } from '../../services/chats-store.service';
import { ChatFolderFormPage } from '../../pages/chat-folder-form-page/chat-folder-form-page';

@Component({
  selector: 'app-change-list-button',
  imports: [TuiDataList, TuiDropdown],
  templateUrl: './change-list-button.html',
  styleUrl: './change-list-button.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeListButton {
  private readonly chatsStoreService = inject(ChatsStoreService);
  private readonly chatFolderService = inject(ChatFolderService);
  private readonly notificationService = inject(NotificationService);
  private readonly sidebarService = inject(SideBarService);
  private readonly injector = inject(Injector);

  readonly chat = input.required<Chat>();

  protected readonly chatLists = this.chatsStoreService.chatLists;
  protected readonly isDrawerOpen = signal(false);
  protected open = signal(false);
  protected changedLists = signal(0);

  protected isChatInList(folderId: string): boolean {
    const chatId = this.chat().id;

    return (
      this.chatLists()
        .find((list) => list.id === folderId)
        ?.items.some((item) => item.chat.id === chatId) ?? false
    );
  }

  protected toggleListChat(folderId: string): void {
    const chatId = this.chat().id;

    if (this.isChatInList(folderId)) {
      this.chatFolderService
        .deleteChatFromFolder(folderId, chatId)
        .pipe(
          tap(() => {
            this.changedLists.update((value) => value + 1);
            timer(2000).subscribe(() => {
              this.notificationService.openPositiveAlert(
                `Списки изменены (${this.changedLists()})`,
              );
              this.changedLists.set(0);
            });
          }),

          catchError(() => {
            this.notificationService.openNegativeAlert('Не удалось обновить списки');
            return EMPTY;
          }),
        )
        .subscribe(() => this.chatsStoreService.loadChatsAndFolders());
    } else {
      this.chatFolderService
        .addChatToFolder(folderId, chatId)
        .pipe(
          tap(() => {
            this.changedLists.update((value) => value + 1);
            timer(2000).subscribe(() => {
              this.notificationService.openPositiveAlert(
                `Списки изменены (${this.changedLists()})`,
              );
              this.changedLists.set(0);
            });
          }),

          catchError(() => {
            this.notificationService.openNegativeAlert('Не удалось обновить списки');
            return EMPTY;
          }),
        )
        .subscribe(() => this.chatsStoreService.loadChatsAndFolders());
    }
  }

  protected createNewList(): void {
    if (this.isDrawerOpen()) {
      return;
    }

    this.isDrawerOpen.set(true);

    this.sidebarService
      .open$<ChatFolderFormPage, null>(
        new PolymorpheusComponent(ChatFolderFormPage, this.injector),
        {
          overlay: false,
          rounded: false,
          offset: false,
          closeOnClickOutside: true,
          direction: 'start',
        },
      )
      .pipe(finalize(() => this.isDrawerOpen.set(false)))
      .subscribe();
  }
}
