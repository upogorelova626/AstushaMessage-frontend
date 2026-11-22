import { ChangeDetectionStrategy, Component, inject, Injector, signal } from '@angular/core';
import { TuiActiveZone, TuiObscured } from '@taiga-ui/cdk';
import { TuiButton, TuiDataList, TuiDropdown, TuiHintDirective, TuiTitle } from '@taiga-ui/core';
import { TuiChevron } from '@taiga-ui/kit';
import { SideBarService } from '../../../../shared/drawer/sidebar.service';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { ChatFolderFormPage } from '../../pages/chat-folder-form-page/chat-folder-form-page';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-chat-folder-menu-button',
  imports: [
    TuiButton,
    TuiHintDirective,
    TuiActiveZone,
    TuiButton,
    TuiChevron,
    TuiDataList,
    TuiDropdown,
    TuiObscured,
    TuiTitle,
  ],
  templateUrl: './chat-folder-menu-button.html',
  styleUrl: './chat-folder-menu-button.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatFolderMenuButton {
  private readonly sidebarService = inject(SideBarService);

  private readonly injector = inject(Injector);

  private readonly isDrawerOpen = signal(false);
  protected readonly open = signal(false);

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

  protected onSelect(): void {
    this.open.set(false);
  }

  protected createNewList(): void {
    if (this.isDrawerOpen()) {
      return;
    }

    this.isDrawerOpen.set(true);

    this.sidebarService
      .open$<ChatFolderFormPage, null>(
        new PolymorpheusComponent(ChatFolderFormPage, this.injector),
        {
          overlay: false,
          rounded: false,
          offset: false,
          closeOnClickOutside: true,
          direction: 'start',
        },
      )
      .pipe(finalize(() => this.isDrawerOpen.set(false)))
      .subscribe();
  }
}
