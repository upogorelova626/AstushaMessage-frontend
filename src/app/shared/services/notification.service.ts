import { inject, Injectable } from '@angular/core';
import { TuiNotificationService } from '@taiga-ui/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly alerts = inject(TuiNotificationService);

  openPositiveAlert(text: string): void {
    this.alerts
      .open(text, {
        appearance: 'positive',
        block: 'end',
        inline: 'start',
      })
      .subscribe();
  }

  openNegativeAlert(text: string): void {
    this.alerts
      .open(text, {
        appearance: 'negative',
        block: 'end',
        inline: 'start',
      })
      .subscribe();
  }
}
