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
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { GoogleMapsModule } from '@angular/google-maps';
import { FreeVisitationComponent } from './components/visit-component/visit-modal/free-visitation/free-visitation.component';
import { DialogQrCodeComponent } from './components/visit-component/dialog-qr-code/dialog-qr-code.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { PortalPageComponent } from './components/portal-page/portal-page.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { AddCommentsComponent } from './components/add-comments/add-comments.component';
import { BackofficeComponent } from './components/backoffice/backoffice.component';
import { MatTabsModule } from '@angular/material/tabs';
import { NewMuseumComponent } from './components/backoffice/components/new-museum/new-museum.component';
import { NewArtistComponent } from './components/backoffice/components/new-artist/new-artist.component';
import { NewArtifactComponent } from './components/backoffice/components/new-artifact/new-artifact.component';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { EditMuseumComponent } from './components/backoffice/components/edit-museum/edit-museum.component';
import { EditArtistComponent } from './components/backoffice/components/edit-artist/edit-artist.component';
import { EditArtifactComponent } from './components/backoffice/components/edit-artifact/edit-artifact.component';
import { NewVisitComponent } from './components/backoffice/components/new-visit/new-visit.component';
import { EditVisitComponent } from './components/backoffice/components/edit-visit/edit-visit.component';
import { NewScheduleComponent } from './components/backoffice/components/new-schedule/new-schedule.component';
import { EditScheduleComponent } from './components/backoffice/components/edit-schedule/edit-schedule.component';
import { ViewCommentsComponent } from './components/view-comments/view-comments.component';
import { EditCommentDialogComponent } from './components/view-comments/edit-comment-dialog/edit-comment-dialog.component';

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
    AddCommentsComponent,
    BackofficeComponent,
    NewMuseumComponent,
    NewArtistComponent,
    NewArtifactComponent,
    EditMuseumComponent,
    EditArtistComponent,
    EditArtifactComponent,
    NewVisitComponent,
    EditVisitComponent,
    NewScheduleComponent,
    EditScheduleComponent,
    ViewCommentsComponent,
    EditCommentDialogComponent
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
    MatBadgeModule,
    MatTabsModule,
    MatSnackBarModule,
    NgxMaskModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule
  ],
  exports: [
    MenuComponent
  ],
})
export class MenuModule { }
