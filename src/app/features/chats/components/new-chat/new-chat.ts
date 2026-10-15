import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiButtonX, TuiButton } from '@taiga-ui/core';
import { injectContext } from '@taiga-ui/polymorpheus';
import { BarContext } from '../../../../shared/drawer/base-bar.service';
import { SearchUsers } from '../search-users/search-users';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AstushaUserPreview } from '../../../../shared/interfaces';

@Component({
  selector: 'app-new-chat',
  imports: [TuiButtonX, TuiButton, SearchUsers, ReactiveFormsModule],
  templateUrl: './new-chat.html',
  styleUrl: './new-chat.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewChat {
  protected readonly context = injectContext<BarContext<any, null>>();

  protected readonly userControl = new FormControl<AstushaUserPreview | null>(
    null,
    Validators.required,
  );
}
