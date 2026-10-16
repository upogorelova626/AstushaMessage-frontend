import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';
import { TuiAvatar } from '@taiga-ui/kit';

@Component({
  selector: 'app-chat-header',
  imports: [TuiButton, TuiAvatar],
  templateUrl: './chat-header.html',
  styleUrl: './chat-header.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatHeader {}
