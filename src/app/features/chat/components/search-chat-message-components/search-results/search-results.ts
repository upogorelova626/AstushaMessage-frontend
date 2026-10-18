import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-search-results',
  imports: [],
  templateUrl: './search-results.html',
  styleUrl: './search-results.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResults {}
