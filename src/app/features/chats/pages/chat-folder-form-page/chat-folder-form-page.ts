import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  TUI_VALIDATION_ERRORS,
  TuiButton,
  TuiDialogService,
  TuiInput,
  TuiTextfield,
  TuiError,
} from '@taiga-ui/core';
import { injectContext, PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { catchError, EMPTY, finalize } from 'rxjs';

import { SelectChatsForList } from '../select-chats-for-list/select-chats-for-list';
import type { Chat, ChatList } from '../../../../shared/interfaces';
import { ChatPreview } from '../../components/chat-preview/chat-preview';
import { ChatFolderService } from '../../../../shared/services/chat-folder.service';
import type { BarContext } from '../../../../shared/drawer/base-bar.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { UnsavedChangesDialog } from '../../components/unsaved-changes-dialog/unsaved-changes-dialog';
import { ChatsStoreService } from '../../services/chats-store.service';

@Component({
  selector: 'app-crete-new-folder-page',
  imports: [TuiButton, TuiTextfield, TuiInput, ChatPreview, ReactiveFormsModule, TuiError],
  templateUrl: './chat-folder-form-page.html',
  styleUrl: './chat-folder-form-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useFactory: () => ({
        maxlength: ({ requiredLength }: { requiredLength: number }) =>
          `Введите не более ${requiredLength} символов`,
        required: () => 'Выберите название для своего списка.',
        pattern: () => 'Название не может состоять только из пробелов',
      }),
    },
  ],
})
export class ChatFolderFormPage {
  private readonly dialogs = inject(TuiDialogService);
  private readonly chatFolderService = inject(ChatFolderService);
  private readonly notificationService = inject(NotificationService);
  private readonly chatsStoreService = inject(ChatsStoreService);

  protected readonly context = injectContext<BarContext<{ folder?: ChatList }, null>>();

  protected readonly isEditing = !!this.context.folder;
  protected readonly list = this.context.folder;

  protected readonly addedChats = signal<Chat[]>([]);
  protected readonly isSaving = signal(false);

  protected readonly nameControl = new FormControl(this.list?.name ?? '', {
    nonNullable: true,
    validators: [Validators.required, Validators.maxLength(100), Validators.pattern(/\S/)],
  });

  constructor() {
    this.addedChats.set(this.list?.items.map((item) => item.chat) ?? []);
  }

  protected addChat(): void {
    this.dialogs
      .open<Chat[]>(new PolymorpheusComponent(SelectChatsForList), {
        label: 'Добавление в список',
        size: 's',
        data: { addedChats: this.addedChats() },
      })
      .subscribe((chats) => {
        this.addedChats.set(chats);
      });
  }

  protected save(): void {
    if (this.isSaving()) {
      return;
    }

    if (this.nameControl.invalid) {
      this.nameControl.markAsTouched();
      this.nameControl.markAllAsDirty();
      return;
    }

    const folder = this.context.folder;

    if (this.isEditing && !folder) {
      this.notificationService.openNegativeAlert('Не удалось найти список для редактирования');
      return;
    }

    const payload = {
      name: this.nameControl.value.trim(),
      chatIds: this.addedChats().map((chat) => chat.id),
    };

    this.isSaving.set(true);

    const request$ = folder
      ? this.chatFolderService.editChatsList(folder.id, payload)
      : this.chatFolderService.createNewChatsList(payload);

    const errorMessage = folder
      ? 'Не удалось сохранить список'
      : 'Не удалось добавить новый список';

    request$
      .pipe(
        catchError(() => {
          this.notificationService.openNegativeAlert(errorMessage);
          return EMPTY;
        }),
        finalize(() => this.isSaving.set(false)),
      )
      .subscribe(() => {
        this.chatsStoreService.loadChatsAndFolders();
        this.context.complete();
      });
  }

  protected getOut(): void {
    if (this.nameControl.value || this.addedChats().length !== 0) {
      this.dialogs
        .open<boolean>(new PolymorpheusComponent(UnsavedChangesDialog), {
          size: 's',
        })
        .subscribe((confirmed) => {
          if (confirmed) {
            this.context.complete();
          }
        });
    } else {
      this.context.complete();
    }
  }

  protected onRemove(chatId: string): void {
    this.addedChats.update((chats) => chats.filter((chat) => chat.id !== chatId));
  }
}
