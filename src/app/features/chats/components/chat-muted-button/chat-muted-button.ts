import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TuiDataList, TuiDropdown } from '@taiga-ui/core';
import type { Chat } from '../../../../shared/interfaces';

@Component({
  selector: 'app-chat-muted-button',
  imports: [TuiDataList, TuiDropdown],
  templateUrl: './chat-muted-button.html',
  styleUrl: './chat-muted-button.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMutedButton {
  readonly chat = input.required<Chat>();

  protected readonly items = ['Edit', 'Download', 'Rename', 'Delete'];
  protected open = false;

  protected onClick(): void {
    this.open = false;
  }
}
