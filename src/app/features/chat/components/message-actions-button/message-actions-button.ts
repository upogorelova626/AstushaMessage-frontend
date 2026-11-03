import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-message-actions-button',
  imports: [],
  templateUrl: './message-actions-button.html',
  styleUrl: './message-actions-button.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageActionsButton {}
