import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ArtifactService } from 'src/app/services/artifact.service';
import { MuseumService } from 'src/app/services/museum.service';
import { Artifact } from 'src/app/interfaces/artifact';
import { VisitService } from 'src/app/services/visit.service';
import { Visitation } from 'src/app/interfaces/visitation';

@Component({
  selector: 'app-new-visit',
  templateUrl: './new-visit.component.html',
  styleUrls: ['./new-visit.component.scss']
})
export class NewVisitComponent implements OnInit {
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
  }]


  exemplos = [
    {
      viewValue: 1,
      viewDisplay: "opção 1"
    },
    {
      viewValue: 2,
      viewDisplay: "opção 2"
    },
    {
      viewValue: 3,
      viewDisplay: "opção 3"
    },
    {
      viewValue: 4,
      viewDisplay: "opção 4"
    },
    {
      viewValue: 5,
      viewDisplay: "opção 5"
    },
  ]
  indexo = 1
  items = [""]
  visitForm!: FormGroup
  idMuseum: string | undefined
  artifacts$!: Observable<Artifact[]>

  constructor(
    private fb: FormBuilder,
    private artifactService: ArtifactService,
    private museumService: MuseumService,
    private snackbar: MatSnackBar,
    private visitService: VisitService
  ) { }

  ngOnInit(): void {
    this.visitForm = this.fb.group({
      type: ["", [Validators.required]],
      artifacts: this.fb.array([])
    })
    this.getMuseum()
  }

  get artifactControl() {
    return this.visitForm.get("artifacts") as FormArray
  }

  createForm() {
    this.fb.group({
      value: [""],
    })
  }

  add() {
    this.artifactControl.push(this.fb.group({
      value: [""],
    }))
  }

  remove(index: any) {
    this.artifactControl.removeAt(index)
  }

  exemplo() {
    console.log(this.visitForm.getRawValue())
  }

  getMuseum() {
    this.museumService.getOneMuseumByName('masp').subscribe({
      next: (res) => {
        this.idMuseum = res._id
      },
      error: (error) => {
        console.log(error)
        this.snackbar.open(error, "fechar")
      },
      complete: () => {
        this.getArtifacts()
      }
    })
  }

  getArtifacts() {
    this.artifacts$ = this.artifactService.getAllArtifactsFromMuseum(this.idMuseum)
  }

  submitVisitation() {
    if(this.visitForm.valid) {
      const visitation: Visitation = {
        typeVisit: this.visitForm.get("type")?.value,
        visitationList: this.visitForm.get("artifacts")?.value
      }

      console.log(visitation)
    }
  }
}
