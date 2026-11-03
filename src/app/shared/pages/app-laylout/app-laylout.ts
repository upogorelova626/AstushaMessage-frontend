import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../../../features/chats/components/sidebar/sidebar';
import { CurrentUserService } from '../../services/current-user.service';

@Component({
  selector: 'app-app-laylout',
  imports: [RouterOutlet, Sidebar],
  templateUrl: './app-laylout.html',
  styleUrl: './app-laylout.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLaylout implements OnInit {
  private readonly currentUserService = inject(CurrentUserService);
  protected readonly isLoading = signal<boolean>(false);

  ngOnInit(): void {
    this.isLoading.set(true);

    this.currentUserService.getMe().subscribe();
  }
}
