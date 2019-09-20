import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import {
  NbSidebarService,
  NbMenuService,
  NbThemeService,
  NbMediaBreakpointsService } from '@nebular/theme';

import { UserData } from 'src/app/@core/data/users';
import { LayoutService } from 'src/app/@core/utils';
import { takeUntil, map } from 'rxjs/operators';

export interface Themes {
  value: string;
  name: string;
}
export interface UserMenu {
  title: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean;
  user: any;

  themes: Themes[] = [
    { value: 'default', name: 'Light' },
    { value: 'dark', name: 'Dark' },
    { value: 'cosmic', name: 'Cosmic' },
    { value: 'corporate', name: 'Corporate' },
  ];

  currentTheme: string;

  userMenu: UserMenu[] = [
    { title: 'Profile' }, { title: 'Log out' },
  ];

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userService: UserData,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService

  ) {
    this.userPictureOnly = true;
    this.currentTheme = 'default';
  }

  ngOnInit(): void {
    this.currentTheme = this.themeService.currentTheme;

    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => this.user = users.nick);

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome(): boolean {
    this.menuService.navigateHome();
    return false;
  }
}
