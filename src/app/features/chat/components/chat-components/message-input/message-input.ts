import { Component, inject, signal } from '@angular/core';
import {
  TuiTextfieldComponent,
  TuiButton,
  TUI_VALIDATION_ERRORS,
  TuiError,
  TuiNotificationService,
} from '@taiga-ui/core';
import { TuiButtonLoading, TuiTextareaComponent } from '@taiga-ui/kit';
import { MessageInputAttachButton } from '../message-input-attach-button/message-input-attach-button';
import { MessageService } from '../../../../../shared/services/message.service';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { OpenedChatService } from '../../../services/opened-chat.service';
import { catchError, EMPTY, finalize } from 'rxjs';

@Component({
  selector: 'app-message-input',
  imports: [
    TuiTextfieldComponent,
    TuiButton,
    TuiTextareaComponent,
    TuiError,
    MessageInputAttachButton,
    ReactiveFormsModule,
    TuiButtonLoading,
  ],
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useFactory: () => ({
        maxlength: ({ requiredLength }: { requiredLength: number }) =>
          `Введите не более ${requiredLength} символов`,
      }),
    },
  ],
  templateUrl: './message-input.html',
  styleUrl: './message-input.less',
})
export class MessageInput {
  private readonly openedChatService = inject(OpenedChatService);
  private readonly messageService = inject(MessageService);

  private readonly alerts = inject(TuiNotificationService);

  protected readonly isSending = signal<boolean>(false);

  protected readonly messageControl = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.maxLength(4000)],
  });

  protected sendMessage() {
    if (this.messageControl.invalid) {
      this.messageControl.markAsTouched();
      return;
    }

    if (this.isSending()) {
      return;
    }

    const chatId = this.openedChatService.chat()?.id;
    const text = this.messageControl.value.trim();
    if (!chatId || !text) {
      return;
    }

    const payload = { text: text };

    this.isSending.set(true);

    this.messageService
      .sendNewMessage(chatId, payload)
      .pipe(
        catchError(() => {
          this.alerts
            .open('Не удалось отправить сообщение', {
              label: 'Ошибка',
              appearance: 'negative',
            })
            .subscribe();
          return EMPTY;
        }),
        finalize(() => this.isSending.set(false)),
      )
      .subscribe((message) => this.messageControl.reset());
  }
}
