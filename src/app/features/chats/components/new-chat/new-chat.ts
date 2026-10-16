import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { TuiButtonX, TuiButton, TuiNotificationService } from '@taiga-ui/core';
import { injectContext } from '@taiga-ui/polymorpheus';
import { BarContext } from '../../../../shared/drawer/base-bar.service';
import { SearchUsers } from '../search-users/search-users';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AstushaUserPreview } from '../../../../shared/interfaces';
import { ChatService } from '../../../../shared/services/chat.service';
import { Router } from '@angular/router';
import { catchError, EMPTY, finalize } from 'rxjs';
import { TuiButtonLoading } from '@taiga-ui/kit';

@Component({
  selector: 'app-new-chat',
  imports: [TuiButtonX, TuiButton, SearchUsers, ReactiveFormsModule, TuiButtonLoading],
  templateUrl: './new-chat.html',
  styleUrl: './new-chat.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewChat {
  private readonly chatService = inject(ChatService);
  private readonly router = inject(Router);
  private readonly alerts = inject(TuiNotificationService);

  protected readonly isCreating = signal(false);

  protected readonly context = injectContext<BarContext<any, null>>();

  protected readonly userControl = new FormControl<AstushaUserPreview | null>(
    null,
    Validators.required,
  );

  protected createChat() {
    const userId = this.userControl.value?.id;

    if (!userId) {
      this.userControl.markAsTouched();
      return;
    }

    const payload = { userId: userId };

    this.isCreating.set(true);

    this.chatService
      .createChat(payload)
      .pipe(
        catchError(() => {
          this.alerts
            .open('Не удалось начать чат', { label: 'Ошибка', appearance: 'negative' })
            .subscribe();

          return EMPTY;
        }),
        finalize(() => this.isCreating.set(false)),
      )
      .subscribe((chat) => {
        this.router.navigate(['/chats', chat.id]);
        console.log(2123);
        this.context.complete(null);
      });
  }
}
