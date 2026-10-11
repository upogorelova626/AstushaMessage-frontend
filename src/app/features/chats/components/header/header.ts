import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-header',
  imports: [TuiButton],
  templateUrl: './header.html',
  styleUrl: './header.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {}
