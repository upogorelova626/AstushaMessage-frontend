import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-system-message-item',
  imports: [],
  templateUrl: './system-message-item.html',
  styleUrl: './system-message-item.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SystemMessageItem {}
