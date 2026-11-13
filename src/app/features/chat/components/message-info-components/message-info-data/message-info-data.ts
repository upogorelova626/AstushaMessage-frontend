import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'app-message-info-data',
  imports: [TuiIcon],
  templateUrl: './message-info-data.html',
  styleUrl: './message-info-data.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageInfoData {}
