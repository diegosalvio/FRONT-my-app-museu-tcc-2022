import { Router } from '@angular/router';
import { MuseumService } from '../../../../services/museum.service';
import { Component, OnInit } from '@angular/core';
import { CheckboxControlValueAccessor, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { pipe, tap, Observable, Subscription, map } from 'rxjs';
import { Museum, Museums } from 'src/app/interfaces/museum';
import { Artifact } from 'src/app/interfaces/artifact';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

@Component({
  selector: 'app-stepper-choose-route',
  templateUrl: './stepper-choose-route.component.html',
  styleUrls: ['./stepper-choose-route.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class StepperChooseRouteComponent implements OnInit {

  routes = [{
    id: 1,
    name: "Curta"
  },
  {
    id: 2,
    name: "Longa"
  },
  {
    id: 3,
    name: "Livre"
  },]

  museums$!: Observable<Museums>

  museumForm!: FormGroup
  routesForm!: FormGroup

  listMuseums!: Museums
  initialMuseum: string = ''
  initialRoute!: number

  arraytest = [{}]

  constructor(
    private _formBuilder: FormBuilder,
    private museumService: MuseumService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log(this.initialRoute)
    this.museumForm = this._formBuilder.group({ museum: ['', Validators.required] });
    this.routesForm = this._formBuilder.group({ route: ['', Validators.required] });

    this.museums$ = this.museumService.getAllMuseums()

  }

  getPersonalizedRoute(idMuseum: string, route: string) {
    console.log("ROUTE: ", route)

    this.museumService.getVisitation(idMuseum, route.toLowerCase()).subscribe(res => console.log(res))
  }

  doneMuseumRoute() {
    const choosenMuseum = this.museumForm.value.museum._id
    const choosenRoute = this.routesForm.value.route

    if (this.museumForm.valid && this.routesForm.valid && this.routesForm.value.route !== "Livre") {

      this.getPersonalizedRoute(choosenMuseum, choosenRoute)
      this.museumService.index = 0
      this.router.navigate(['menu/visit-modal'])
    } else if (this.routesForm.value.route === "Livre") {
      console.log("Caiu no else if?")
      this.getPersonalizedRoute(choosenMuseum, choosenRoute)
      this.router.navigate(["menu/visit-modal/free-visitation"])
    } else {
      console.log("Formulário Inválido")
    }
  }

  get errorsMuseumForms() {
    return this.museumForm.get("museum")?.errors
  }
  get errorsRouteForms() {
    return this.routesForm.get("route")?.errors
  }

  get museumForms() {
    return this.museumForm.get("museum")
  }
  get routeForms() {
    return this.routesForm.get("route")
  }


}
