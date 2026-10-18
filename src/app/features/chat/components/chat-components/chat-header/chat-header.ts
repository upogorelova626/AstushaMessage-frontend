import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TuiButton, TuiHint } from '@taiga-ui/core';
import { TuiAvatar } from '@taiga-ui/kit';
import { ChatMenuButton } from '../chat-menu-button/chat-menu-button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-header',
  imports: [TuiButton, TuiAvatar, TuiHint, ChatMenuButton],
  templateUrl: './chat-header.html',
  styleUrl: './chat-header.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatHeader {
  private readonly router = inject(Router);

  protected openSearch() {
    this.router.navigate(['search']);
  }
}
