import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../../../features/chats/components/sidebar/sidebar';

@Component({
  selector: 'app-app-laylout',
  imports: [RouterOutlet, Sidebar],
  templateUrl: './app-laylout.html',
  styleUrl: './app-laylout.less',
})
export class AppLaylout {}
