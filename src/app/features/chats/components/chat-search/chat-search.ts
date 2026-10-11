import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiTextfieldComponent, TuiInput } from '@taiga-ui/core';

@Component({
  selector: 'app-chat-search',
  imports: [TuiTextfieldComponent, TuiInput],
  templateUrl: './chat-search.html',
  styleUrl: './chat-search.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatSearch {}
