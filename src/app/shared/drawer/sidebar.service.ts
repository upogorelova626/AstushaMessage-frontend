import { Injectable } from '@angular/core';
import { BaseBarService } from './base-bar.service';
import type { TuiHorizontalDirection } from '@taiga-ui/core';

export interface SidebarOptions {
  overlay?: boolean;
  closeOnClickOutside?: boolean;
  rounded?: boolean;
  offset?: boolean;
  direction?: TuiHorizontalDirection;
}

@Injectable()
export class SideBarService extends BaseBarService<SidebarOptions> {}
