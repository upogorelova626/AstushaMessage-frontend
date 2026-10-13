import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiButtonX, TuiTextfieldComponent, TuiInputDirective, TuiButton } from '@taiga-ui/core';
import { injectContext } from '@taiga-ui/polymorpheus';
import { BarContext } from '../../../../shared/drawer/base-bar.service';

@Component({
  selector: 'app-new-chat',
  imports: [TuiButtonX, TuiTextfieldComponent, TuiInputDirective, TuiButton],
  templateUrl: './new-chat.html',
  styleUrl: './new-chat.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewChat {
  protected readonly context = injectContext<BarContext<any, null>>();
}
