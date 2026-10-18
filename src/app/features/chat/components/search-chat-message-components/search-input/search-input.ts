import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiTextfieldComponent, TuiButton, TuiInput } from '@taiga-ui/core';

@Component({
  selector: 'app-search-input',
  imports: [TuiTextfieldComponent, TuiButton, TuiInput],
  templateUrl: './search-input.html',
  styleUrl: './search-input.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInput {}
