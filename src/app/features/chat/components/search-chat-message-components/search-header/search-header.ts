import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TuiButton, TuiButtonX } from '@taiga-ui/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-header',
  imports: [TuiButton, TuiButtonX],
  templateUrl: './search-header.html',
  styleUrl: './search-header.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchHeader {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected closeSearchPage(): void {
    const chatId = this.route.snapshot.paramMap.get('chatId');

    if (!chatId) {
      return;
    }

    void this.router.navigate(['/chats', chatId]);
  }
}
