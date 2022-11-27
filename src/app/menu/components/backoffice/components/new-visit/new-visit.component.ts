import { DialogComponent } from './../../../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { ArtifactService } from 'src/app/services/artifact.service';
import { MuseumService } from 'src/app/services/museum.service';
import { Artifact } from 'src/app/interfaces/artifact';
import { VisitService } from 'src/app/services/visit.service';
import { NewVisitation } from 'src/app/interfaces/visitation';

@Component({
  selector: 'app-new-visit',
  templateUrl: './new-visit.component.html',
  styleUrls: ['./new-visit.component.scss']
})
export class NewVisitComponent implements OnInit {

  @Input() museum: string | undefined

  routes = [{
    id: 1,
    name: "Curta"
  },
  {
    id: 2,
    name: "Longa"
  }]
  visitForm!: FormGroup
  idMuseum: string | undefined
  artifacts$!: Observable<Artifact[]>
  canSubmit = true
  list!: Array<string>

  constructor(
    private fb: FormBuilder,
    private artifactService: ArtifactService,
    private museumService: MuseumService,
    private snackbar: MatSnackBar,
    private visitService: VisitService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.visitForm = this.fb.group({
      type: ["", [Validators.required]],
      artifacts: this.fb.array([]),
    })
    this.getMuseum()
  }

  get artifactControl() {
    return this.visitForm.get("artifacts") as FormArray
  }

  add() {
    this.artifactControl.push(this.fb.group({
      idArtifact: ["", [Validators.required]],
    }))
  }

  remove(index: any) {
    this.dialog.open(DialogComponent, {
      data: {
        title: "Atenção!",
        body: "Remover obra da lista?",
        action: "excluir"
      }
    }).afterClosed().subscribe(
      (res) => {
        if (res) {
          this.artifactControl.removeAt(index)
        }
      }
    )
  }

  getMuseum() {
    this.museumService.getOneMuseumByName(this.museum).subscribe({
      next: (res) => {
        this.idMuseum = res._id
      },
      error: (error) => {
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

  getArtifactList() {
    const arr = this.visitForm.get("artifacts")?.value
    const newArr = arr.map((value: any) => {
      return value.idArtifact
    })
    const unique = newArr.filter((value: string, index: number, array: [string]) => array.indexOf(value) !== index)
    if (unique.length > 0) {
      this.canSubmit = false
      this.snackbar.open("Não repita itens na lista", "okay")
      newArr.length = 0
    } else {
      this.canSubmit = true
    }

    this.list = newArr
  }

  submitVisitation() {
    this.getArtifactList()
    if (this.visitForm.valid && this.canSubmit && this.list.length) {
      const visitation: NewVisitation = {
        type: this.visitForm.get("type")?.value.toLowerCase(),
        artifactList: this.list
      }
      this.visitService.newVisit(this.idMuseum, visitation).subscribe({
        next: (res) => console.log("A seguinte rota foi adicionada: ", res),
        error: (error) => this.snackbar.open(error.error.error, "okay"),
        complete: () => this.snackbar.open("Rota cadastrada com sucesso!", "fechar")
      })
    } else this.snackbar.open("Formulário inválido", "okay")
  }
}
