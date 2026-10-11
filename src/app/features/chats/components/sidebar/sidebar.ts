import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TuiButton, TuiHintDirective, TuiHintDescribe } from '@taiga-ui/core';

@Component({
  selector: 'app-sidebar',
  imports: [TuiButton, TuiHintDirective],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {
  private readonly router = inject(Router);

  protected goTo(path: string): void {
    this.router.navigate([path]);
  }
}
