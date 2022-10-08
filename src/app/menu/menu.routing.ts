import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StepperChooseRouteComponent } from './components/visit-component/stepper-choose-route/stepper-choose-route.component';
import { VisitModalComponent } from './components/visit-component/visit-modal/visit-modal.component';
import { MenuComponent } from './menu.component';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent
   },
   {
    path: 'choose-museum',
    component: StepperChooseRouteComponent
   },
   {
    path: 'visit-modal',
    component: VisitModalComponent
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule {}
