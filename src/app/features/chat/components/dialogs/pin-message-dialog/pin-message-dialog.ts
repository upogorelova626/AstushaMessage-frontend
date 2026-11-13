import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiButton, type TuiDialogContext, TuiInput, TuiLabel, TuiRadio } from '@taiga-ui/core';
import { injectContext } from '@taiga-ui/polymorpheus';
import { PinMessageDuration } from '../../../../../shared/interfaces';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-pin-message-dialog',
  imports: [TuiButton, TuiInput, TuiRadio, TuiLabel, ReactiveFormsModule],
  templateUrl: './pin-message-dialog.html',
  styleUrl: './pin-message-dialog.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PinMessageDialog {
  protected readonly context =
    injectContext<TuiDialogContext<boolean | PinMessageDuration, null>>();

  protected readonly form = new FormGroup({
    duration: new FormControl(PinMessageDuration.OneDay, {
      nonNullable: true,
    }),
  });
  protected PinMessageDuration = PinMessageDuration;

  protected pin(): void {
    this.context.completeWith(this.form.controls.duration.value);
  }
}
