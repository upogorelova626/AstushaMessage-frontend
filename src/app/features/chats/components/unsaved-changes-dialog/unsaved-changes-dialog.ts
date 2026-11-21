import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiButton, type TuiDialogContext } from '@taiga-ui/core';

import { injectContext } from '@taiga-ui/polymorpheus';

@Component({
  selector: 'app-unsaved-changes-dialog',
  imports: [TuiButton],
  templateUrl: './unsaved-changes-dialog.html',
  styleUrl: './unsaved-changes-dialog.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnsavedChangesDialog {
  protected readonly context = injectContext<TuiDialogContext<boolean, void>>();
}
