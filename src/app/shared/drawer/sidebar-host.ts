import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TuiDrawer } from '@taiga-ui/kit';
import { AsyncPipe } from '@angular/common';
import { PolymorpheusOutlet } from '@taiga-ui/polymorpheus';
import { SidebarOptions, SideBarService } from '../sidebar.service';
import { BarItem } from '../base-bar.service';

@Component({
  selector: 'app-sidebar-host',
  imports: [TuiDrawer, PolymorpheusOutlet, AsyncPipe],
  templateUrl: './sidebar-host.html',
  styleUrl: './sidebar-host.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarHost {
  private readonly sidebarService = inject(SideBarService);

  protected readonly items$ = this.sidebarService.items$;

  onClickOutside(item: BarItem<unknown, SidebarOptions, unknown>) {
    if (item.options?.closeOnClickOutside) {
      item.context.complete();
    }
  }
}
