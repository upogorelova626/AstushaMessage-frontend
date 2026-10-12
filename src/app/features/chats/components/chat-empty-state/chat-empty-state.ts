import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-chat-empty-state',
  imports: [TuiButton],
  templateUrl: './chat-empty-state.html',
  styleUrl: './chat-empty-state.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatEmptyState {}
