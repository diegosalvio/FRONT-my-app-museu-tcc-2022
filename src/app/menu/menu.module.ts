import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MenuRoutingModule } from './menu.routing';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderModule } from './components/header/header.module';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StepperChooseRouteComponent } from './components/visit-component/stepper-choose-route/stepper-choose-route.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { VisitModalComponent } from './components/visit-component/visit-modal/visit-modal.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';

import { GoogleMapsModule } from '@angular/google-maps';
import { FreeVisitationComponent } from './components/visit-component/visit-modal/free-visitation/free-visitation.component';
import { DialogQrCodeComponent } from './components/visit-component/dialog-qr-code/dialog-qr-code.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { PortalPageComponent } from './components/portal-page/portal-page.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { AddCommentsComponent } from './components/add-comments/add-comments.component';

@NgModule({
  declarations: [
    MenuComponent,
    DialogComponent,
    StepperChooseRouteComponent,
    VisitModalComponent,
    FreeVisitationComponent,
    DialogQrCodeComponent,
    PortalPageComponent,
    EditUserComponent,
    AddCommentsComponent
  ],
  imports: [
    CommonModule, MenuRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    HeaderModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    MatStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatExpansionModule,
    MatDividerModule,
    GoogleMapsModule,
    ZXingScannerModule,
    MatBadgeModule
  ],
  exports: [
    MenuComponent
  ],
})
export class MenuModule { }
