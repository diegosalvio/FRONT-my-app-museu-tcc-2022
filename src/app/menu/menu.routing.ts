import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StepperChooseRouteComponent } from './components/stepper-choose-route/stepper-choose-route.component';
import { MenuComponent } from './menu.component';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent
   },
   {
    path: 'choose-museum',
    component: StepperChooseRouteComponent
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule {}
