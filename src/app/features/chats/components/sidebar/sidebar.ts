import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TuiButton, TuiHintDirective } from '@taiga-ui/core';
import { CurrentUserService } from '../../../../shared/services/current-user.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-sidebar',
  imports: [TuiButton, TuiHintDirective],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {
  private readonly router = inject(Router);
  private readonly currentUserService = inject(CurrentUserService);

  protected goTo(path: string): void {
    this.router.navigate([path]);
  }

  protected readonly currentUser = toSignal(this.currentUserService.currentUser$, {
    initialValue: null,
  });
}
