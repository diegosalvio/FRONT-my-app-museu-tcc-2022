import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MenuRoutingModule } from './menu.routing';
import {MatButtonModule} from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderModule } from './components/header/header.module';

@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule, MenuRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    HeaderModule
  ]
})
export class MenuModule { }
