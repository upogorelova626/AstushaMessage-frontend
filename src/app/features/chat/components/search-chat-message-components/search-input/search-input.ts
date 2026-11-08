import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { TuiTextfieldComponent, TuiButton, TuiInput } from '@taiga-ui/core';
import { OpenedChatService } from '../../../services/opened-chat.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  finalize,
  map,
  of,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { MessageService } from '../../../../../shared/services/message.service';
import { FoundedMessagesInChatService } from '../../../services/founded-messages-in-chat.service';

@Component({
  selector: 'app-search-input',
  imports: [TuiTextfieldComponent, TuiButton, TuiInput, ReactiveFormsModule],
  templateUrl: './search-input.html',
  styleUrl: './search-input.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInput {
  private readonly openedChatService = inject(OpenedChatService);
  private readonly messageService = inject(MessageService);
  private readonly foundedMessagesInChatService = inject(FoundedMessagesInChatService);

  private readonly chat = this.openedChatService.chat;

  protected readonly searchControl = new FormControl('', { nonNullable: true });

  constructor() {
    effect((onCleanup) => {
      const chatId = this.chat()?.id;

      this.foundedMessagesInChatService.cleanFoundedMessages();

      if (!chatId) {
        return;
      }

      const subscription = this.searchControl.valueChanges
        .pipe(
          startWith(this.searchControl.value),
          map((value) => value.trim()),
          tap(() => {
            this.foundedMessagesInChatService.isSearching.set(true);
          }),
          debounceTime(300),
          distinctUntilChanged(),
          switchMap((query) => {
            if (!query) {
              this.foundedMessagesInChatService.cleanFoundedMessages();
              return of(null);
            }

            this.foundedMessagesInChatService.isLoading.set(true);

            return this.messageService.searchMessages(chatId, { query }).pipe(
              catchError(() => {
                return of(null);
              }),
              finalize(() => {
                this.foundedMessagesInChatService.isLoading.set(false);
              }),
            );
          }),
        )
        .subscribe((messagesList) => {
          if (messagesList !== null) {
            this.foundedMessagesInChatService.messagesList.set(messagesList);
            this.foundedMessagesInChatService.isSearching.set(false);
          }
        });

      onCleanup(() => {
        subscription.unsubscribe();
      });
    });
  }
}
