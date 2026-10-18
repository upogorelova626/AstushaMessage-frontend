import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiButton, TuiButtonX } from '@taiga-ui/core';

@Component({
  selector: 'app-search-header',
  imports: [TuiButton, TuiButtonX],
  templateUrl: './search-header.html',
  styleUrl: './search-header.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchHeader {}
