import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  TUI_VALIDATION_ERRORS,
  TuiButton,
  TuiDialogService,
  TuiInput,
  TuiTextfield,
  TuiErrorComponent,
} from '@taiga-ui/core';
import { injectContext, PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { SelectChatsForList } from '../select-chats-for-list/select-chats-for-list';
import type { Chat } from '../../../../shared/interfaces';
import { ChatPreview } from '../../components/chat-preview/chat-preview';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ChatFolderService } from '../../../../shared/services/chat-folder.service';
import type { BarContext } from '../../../../shared/drawer/base-bar.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { catchError, EMPTY, finalize } from 'rxjs';

@Component({
  selector: 'app-crete-new-folder-page',
  imports: [TuiButton, TuiTextfield, TuiInput, ChatPreview, ReactiveFormsModule, TuiErrorComponent],
  templateUrl: './crete-new-folder-page.html',
  styleUrl: './crete-new-folder-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useFactory: () => ({
        maxlength: ({ requiredLength }: { requiredLength: number }) =>
          `Введите не более ${requiredLength} символов`,
      }),
    },
  ],
})
export class CreteNewFolderPage {
  private readonly dialogs = inject(TuiDialogService);
  private readonly chatFolderService = inject(ChatFolderService);
  private readonly notificationService = inject(NotificationService);

  protected readonly context = injectContext<BarContext<boolean, null>>();

  protected readonly addedChats = signal<Chat[]>([]);
  protected readonly isSaving = signal(false);

  protected readonly nameControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.maxLength(100)],
  });

  protected addChat(): void {
    this.dialogs
      .open<Chat[]>(new PolymorpheusComponent(SelectChatsForList), {
        label: 'Добавление в список',
        size: 's',
      })
      .subscribe((chats) => this.addedChats.set(chats));
  }

  protected createList(): void {
    if (this.nameControl.invalid) {
      this.nameControl.markAsTouched();
      this.nameControl.markAllAsDirty();
      return;
    }

    this.isSaving.set(true);

    const listName = this.nameControl.value.trim();
    const ids = this.addedChats().map((chat) => chat.id);

    const payload = {
      name: listName,
      chatIds: ids,
    };

    this.chatFolderService
      .createNewFolder(payload)
      .pipe(
        finalize(() => this.isSaving.set(false)),
        catchError(() => {
          this.notificationService.openNegativeAlert('Не удалось добавить новый список');
          return EMPTY;
        }),
      )
      .subscribe();
  }
}
