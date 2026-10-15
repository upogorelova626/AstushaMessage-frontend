import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AstushaUserPreview } from '../../interfaces';

@Component({
  selector: 'app-user-preview',
  imports: [],
  templateUrl: './user-preview.html',
  styleUrl: './user-preview.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPreview {
  readonly user = input.required<AstushaUserPreview>();
}
