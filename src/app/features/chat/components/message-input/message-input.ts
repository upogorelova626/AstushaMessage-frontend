import { Component } from '@angular/core';
import { TuiTextfieldComponent, TuiInputDirective, TuiButton, TuiIcon } from '@taiga-ui/core';
import { TuiBadge, TuiTextareaComponent } from '@taiga-ui/kit';

@Component({
  selector: 'app-message-input',
  imports: [TuiTextfieldComponent, TuiInputDirective, TuiButton, TuiTextareaComponent],
  templateUrl: './message-input.html',
  styleUrl: './message-input.less',
})
export class MessageInput {}
