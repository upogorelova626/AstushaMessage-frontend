import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-add-contact',
  imports: [],
  templateUrl: './add-contact.html',
  styleUrl: './add-contact.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddContact {}
