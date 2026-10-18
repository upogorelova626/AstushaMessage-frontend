import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { TuiActiveZone } from '@taiga-ui/cdk/directives/active-zone';
import { TuiObscured } from '@taiga-ui/cdk/directives/obscured';
import { TuiButton, TuiDataList, TuiDropdown, TuiHint, TuiTitle } from '@taiga-ui/core';

interface Action {
  readonly title: string;
  readonly iconStart: string;
}

@Component({
  selector: 'app-message-input-attach-button',
  imports: [TuiButton, TuiHint, TuiActiveZone, TuiDataList, TuiDropdown, TuiObscured],
  templateUrl: './message-input-attach-button.html',
  styleUrl: './message-input-attach-button.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageInputAttachButton {
  protected readonly actions: readonly Action[] = [
    { title: 'Документ', iconStart: '@tui.file-text' },
    { title: 'Фото и видео', iconStart: '@tui.images' },
    { title: 'Камера', iconStart: '@tui.camera' },
    { title: 'Аудио', iconStart: '@tui.headphones' },
    { title: 'Контакт', iconStart: '@tui.thumbs-down' },
    { title: 'Опрос', iconStart: '@tui.user' },
    { title: 'Мероприятие', iconStart: '@tui.calendar-days' },
    { title: 'Новый стикер', iconStart: '@tui.sticker' },
  ];

  protected readonly open = signal(false);
  protected readonly selected = signal<Action | null>(null);
  protected readonly buttonLabel = computed(() => this.selected()?.title ?? 'Choose');

  protected onClick(): void {
    this.open.update((open) => !open);
  }

  protected onObscured(obscured: boolean): void {
    if (obscured) {
      this.open.set(false);
    }
  }

  protected onActiveZone(active: boolean): void {
    if (!active) {
      this.open.set(false);
    }
  }

  protected onSelect(action: Action): void {
    this.selected.set(action);
    this.open.set(false);
  }
}
