import { Component } from '@angular/core';

@Component({
  selector: 'app-pages',
  template: `
    <h2>Pages Works!!</h2>
    <a routerLink="/auth">Logout</a>
    <router-outlet><router-outlet>
  `,
  styleUrls: []
})
export class PagesComponent {
}
