import { ChangeDetectionStrategy, Component, inject, Injector } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';
import { SideBarService } from '../../../../shared/drawer/sidebar.service';
import { AddContact } from '../add-contact/add-contact';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';

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
      .open$<AddContact, null>(new PolymorpheusComponent(AddContact, this.injector), {
        overlay: false,
        rounded: false,
        offset: false,
        closeOnClickOutside: true,
      })
      .subscribe();
  }
}
