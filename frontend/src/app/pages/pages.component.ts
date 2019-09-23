import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'app-pages',
  template: `
    <nb-menu [items]="menu"></nb-menu>
    <router-outlet><router-outlet>
  `,
  styleUrls: []
})
export class PagesComponent {
  menu = MENU_ITEMS;
}
