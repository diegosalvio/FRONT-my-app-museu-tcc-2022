import { BackofficeComponent } from './components/backoffice/backoffice.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { PortalPageComponent } from './components/portal-page/portal-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StepperChooseRouteComponent } from './components/visit-component/stepper-choose-route/stepper-choose-route.component';
import { FreeVisitationComponent } from './components/visit-component/visit-modal/free-visitation/free-visitation.component';
import { VisitModalComponent } from './components/visit-component/visit-modal/visit-modal.component';
import { MenuComponent } from './menu.component';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    children: [
      {
        path: '',
        component: PortalPageComponent
       },
      {
        path: 'choose-museum',
        component: StepperChooseRouteComponent
       },
       {
        path: 'visit-modal',
        component: VisitModalComponent
       },
       {
        path: 'visit-modal/free-visitation',
        component: FreeVisitationComponent
       },
       {
        path: 'edit-user',
        component: EditUserComponent
       },
       {
        path: 'backoffice',
        component: BackofficeComponent
       }
      ]
   }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule {}
