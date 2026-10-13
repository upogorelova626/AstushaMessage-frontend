import { ChangeDetectionStrategy, Component, inject, Injector } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';
import { SideBarService } from '../../../../shared/drawer/sidebar.service';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { NewChat } from '../new-chat/new-chat';

@Component({
  selector: 'app-chat-empty-state',
  imports: [TuiButton],
  templateUrl: './chat-empty-state.html',
  styleUrl: './chat-empty-state.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatEmptyState {
  private readonly sidebarService = inject(SideBarService);
  private readonly injector = inject(Injector);

  protected addChat(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.sidebarService
      .open$<NewChat, null>(new PolymorpheusComponent(NewChat, this.injector), {
        overlay: false,
        rounded: false,
        offset: false,
        closeOnClickOutside: true,
      })
      .subscribe();
  }
}
