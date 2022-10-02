import { MuseumService } from './../../../services/museum.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { pipe, tap, Observable, Subscription, map } from 'rxjs';
import { Museum, Museums } from 'src/app/interfaces/museum';
import { Artifact } from 'src/app/interfaces/artifact';

@Component({
  selector: 'app-stepper-choose-route',
  templateUrl: './stepper-choose-route.component.html',
  styleUrls: ['./stepper-choose-route.component.scss']
})
export class StepperChooseRouteComponent implements OnInit {

  routes = [{
    id: 1,
    name: "Curto"
  },
  {
    id: 2,
    name: "Longo"
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
    private museumService: MuseumService
  ) { }

  ngOnInit() {
    console.log(this.initialRoute)
    this.museumForm = this._formBuilder.group({ museum: ['', Validators.required] });
    this.routesForm = this._formBuilder.group({ route: ['', Validators.required] });

    this.museums$ = this.museumService.getAllMuseums()

  }

  getPersonalizedRoute(idMuseum: string, route: string) {
    console.log("ROUTE: ", route)
    if (route == "1") {
      this.museumService.getLevel3ArtifactsFromMuseum(idMuseum).subscribe(
        (resp) => {
          console.log("Obras nível 3: ", resp)
        }
      )
    } else if (route == "2") {
      this.museumService.getLevel2ArtifactsFromMuseum(idMuseum).subscribe(
        (resp) => {
          console.log("Obras nível 2:", resp)
        })
    } else {
      this.museumService.getAllArtifactsFromMuseum(idMuseum).subscribe(
        (resp) => {
          console.log("Dentro do subscribe: ", resp)
        }
      )
    }
  }

  doneMuseumRoute() {
    if (this.museumForm.valid && this.routesForm.valid) {
      const choosenMuseum = this.museumForm.value.museum
      const choosenRoute = this.routesForm.value.route

      this.getPersonalizedRoute(choosenMuseum, choosenRoute)
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
