import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TuiButtonX } from '@taiga-ui/core';
import type { BarContext } from '../../../../../shared/drawer/base-bar.service';

@Component({
  selector: 'app-message-info-page-header',
  imports: [TuiButtonX],
  templateUrl: './message-info-page-header.html',
  styleUrl: './message-info-page-header.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageInfoPageHeader {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly context = input<BarContext | null>(null);

  protected closeMessageInfoPage(): void {
    if (this.context()) {
      this.context()?.complete();
    }

    const chatId = this.route.snapshot.paramMap.get('chatId');

    if (!chatId) {
      return;
    }

    void this.router.navigate(['/chats', chatId]);
  }
}
