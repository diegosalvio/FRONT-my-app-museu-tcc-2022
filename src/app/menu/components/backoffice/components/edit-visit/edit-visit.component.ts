import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Artifact } from 'src/app/interfaces/artifact';
import { NewVisitation } from 'src/app/interfaces/visitation';
import { ArtifactService } from 'src/app/services/artifact.service';
import { MuseumService } from 'src/app/services/museum.service';
import { VisitService } from 'src/app/services/visit.service';
import { DialogComponent } from '../../../dialog/dialog.component';

@Component({
  selector: 'app-edit-visit',
  templateUrl: './edit-visit.component.html',
  styleUrls: ['./edit-visit.component.scss']
})
export class EditVisitComponent implements OnInit {

  @Input() museum: string | undefined

  routes = [{
    id: 1,
    name: "Curta"
  },
  {
    id: 2,
    name: "Longa"
  }]
  editVisitForm!: FormGroup
  idMuseum: string | undefined
  artifacts$!: Observable<Artifact[]>
  canSubmit = true
  list!: Array<string>
  visitationList!: Array<Artifact>
  showAddButton = false
  visitationType: any

  constructor(
    private fb: FormBuilder,
    private artifactService: ArtifactService,
    private museumService: MuseumService,
    private snackbar: MatSnackBar,
    private visitService: VisitService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.editVisitForm = this.fb.group({
      type: ["", [Validators.required]],
      artifacts: this.fb.array([])
    })
    this.getMuseum()
  }

  get artifactControl() {
    return this.editVisitForm.get("artifacts") as FormArray
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

  editInput() {
    this.artifactControl.enable()
    this.showAddButton = true
  }

  getMuseum() {
    this.museumService.getOneMuseumByName(this.museum).subscribe({
      next: (res) => {
        this.idMuseum = res._id
      },
      error: (error) => {
        this.snackbar.open(error.error.message, "fechar")
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
    const arr = this.editVisitForm.get("artifacts")?.value
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

  getVisitByType() {
    this.artifactControl.controls.length = 0
    const typeVisit = this.editVisitForm.get("type")?.value.toLowerCase()
    this.visitService.getVisitationList(this.idMuseum, typeVisit).subscribe({
      next: (res) => {
        this.visitationList = res.visitationList
        this.visitationType = res.typeVisit
      },
      error: (error) => {
        this.snackbar.open(error.error, "okay")
      },
      complete: () => {
        this.visitationList.forEach(res => {
          this.artifactControl.push(
            this.fb.group({
              idArtifact: res._id
            })
          )
          this.artifactControl.disable()
        })
      }
    })
  }

  submitEditedVisitation() {
    this.getArtifactList()
    if (this.editVisitForm.valid && this.canSubmit) {
      const editVisitation: NewVisitation = {
        type: this.editVisitForm.get("type")?.value.toLowerCase(),
        artifactList: this.list
      }
      this.visitService.updateVisit(this.visitationType._id, editVisitation).subscribe({
        next: (res) => this.snackbar.open(`Editando informações da visitação ${res}`, "okay"),
        error: (error) => {
          this.snackbar.open(error.error.error, "okay")
        },
        complete: () => this.snackbar.open("Informações editadas com sucesso", "okay")
      })
    }
  }

}
