import { NgModule } from '@angular/core';
import { ThemeModule } from '../@theme/theme.module';
import { PagesRoutingModule } from './pages-routing.module';
import { NbMenuModule } from '@nebular/theme';
import { PagesComponent } from './pages.component';

@NgModule({
  imports: [
    ThemeModule,
    PagesRoutingModule,
    NbMenuModule,


  ],
  declarations: [PagesComponent]
})
export class PagesModule { }
