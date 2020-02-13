import {Component} from '@angular/core';
import {NbMenuService, NbSidebarService, NbThemeService} from '@nebular/theme';
import { MENU_ITEMS } from './menu';
import {GlobalVariablesService} from './providers/global-variables.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  items = MENU_ITEMS;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  constructor(private themeService: NbThemeService, private sidebarService: NbSidebarService,
              public globalVariablesService: GlobalVariablesService) {

    if(!localStorage.getItem('theme')){
      localStorage.setItem('theme', this.globalVariablesService.theme);
    }
    this.globalVariablesService.theme = localStorage.getItem('theme');
    this.currentTheme = this.globalVariablesService.theme;
    this.themeService.changeTheme(this.globalVariablesService.theme);
  }

  changeTheme(themeName: string) {
    this.globalVariablesService.theme = themeName;
    localStorage.setItem('theme', this.globalVariablesService.theme);
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }
}
