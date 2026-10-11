import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-chat-filters',
  imports: [TuiButton],
  templateUrl: './chat-filters.html',
  styleUrl: './chat-filters.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatFilters {}
