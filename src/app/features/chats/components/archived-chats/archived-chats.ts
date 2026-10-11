import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-archived-chats',
  imports: [TuiButton],
  templateUrl: './archived-chats.html',
  styleUrl: './archived-chats.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArchivedChats {}
