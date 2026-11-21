import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';
import { ChatHeaderActionsButton } from '../chat-header-actions-button/chat-header-actions-button';

@Component({
  selector: 'app-header',
  imports: [TuiButton, ChatHeaderActionsButton],
  templateUrl: './header.html',
  styleUrl: './header.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {}
