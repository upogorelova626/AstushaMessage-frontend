import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-closed-chats',
  imports: [TuiButton],
  templateUrl: './closed-chats.html',
  styleUrl: './closed-chats.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClosedChats {}
