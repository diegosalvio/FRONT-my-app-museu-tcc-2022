import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Artifact } from 'src/app/interfaces/artifact';
import { ArtifactService } from 'src/app/services/artifact.service';
import { DialogComponent } from '../../../dialog/dialog.component';

@Component({
  selector: 'app-edit-artifact',
  templateUrl: './edit-artifact.component.html',
  styleUrls: ['./edit-artifact.component.scss']
})
export class EditArtifactComponent implements OnInit {

  editArtifactForm!: FormGroup
  artifact$!: Observable<Artifact[]>
  disables = true
  idArtifact: string | undefined
  disablesDeleteButton = false

  constructor(
    private fb: FormBuilder,
    private artifactService: ArtifactService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.selectArtifact()
    this.editArtifactForm = this.fb.group({
      id: ["", [Validators.required]],
      title: ["", [Validators.required, Validators.minLength(3)]],
      date: ["", [Validators.required]],
      informationAbout: ["", [Validators.required, Validators.maxLength(5000)]],
      image: ["", [Validators.required]],
      lat: ["", [Validators.required]],
      lng: ["", [Validators.required]],
      artist: ["", [Validators.required]]
    })
    this.setEnablesDisables()
  }

  selectArtifact() {
    this.artifact$ = this.artifactService.getAllArtifactsFromMuseum("6339dbdef5747cb44694313f")
  }

  getArtifact() {
    const idMuseum = this.editArtifactForm.get("id")?.value
    this.artifactService.getArtifact(idMuseum).subscribe({
      next: (res) => {
        this.idArtifact = res._id
        this.disablesDeleteButton = true
        this.editArtifactForm.patchValue({
          title: res.title,
          date: res.date,
          informationAbout: res.informationAbout,
          image: res.image,
          lat: res.geolocation.lat,
          lng: res.geolocation.lng
        })
      }
    })
  }

  setEnablesDisables() {
    this.editArtifactForm.disable()
    this.editArtifactForm.get("id")?.enable()
  }

  editInput(control: string) {
    if (this.editArtifactForm.get("id")?.valid) {
      this.editArtifactForm.get(control)?.enable()
      this.disables = false
    }
  }

  submitEditArtifact() {
    if (this.editArtifactForm.valid) {
      const updatedArtifact: Artifact = {
        title: this.editArtifactForm.get("title")?.value,
        date: this.editArtifactForm.get("date")?.value,
        informationAbout: this.editArtifactForm.get("informationAbout")?.value,
        image: this.editArtifactForm.get("image")?.value,
        geolocation: {
          lat: this.editArtifactForm.get("lat")?.value,
          lng: this.editArtifactForm.get("lng")?.value
        }
      }
      const idMuseum = this.editArtifactForm.get("id")?.value
      this.artifactService.updateArtifact(idMuseum, updatedArtifact).subscribe({
        next: (res) => {
          console.log("Obra editada com sucesso: ", res)
        },
        error: (error) => {
          console.log(error)
        },
        complete: () => {
          this.snackbar.open("Obra editada com sucesso!", "fechar")
        }
      })
    }
  }

  deleteArtifact() {
    this.dialog.open(DialogComponent, {
      data: {
        title: "Atenção!",
        body: "Tem certeza que deseja deletar esta obra?",
        action: "deletar"
      }
    })
      .afterClosed()
      .subscribe({
        next: (res) => {
          if (res) {
            this.artifactService.deleteArtifact(this.idArtifact)
            console.log("obra deletada")
          }
        }
      })
  }

  get idError() {
    return this.editArtifactForm.get("id")?.errors
  }

  get titleError() {
    return this.editArtifactForm.get("title")?.errors
  }
  get dateError() {
    return this.editArtifactForm.get("date")?.errors
  }
  get informationAboutError() {
    return this.editArtifactForm.get("informationAbout")?.errors
  }
  get imageError() {
    return this.editArtifactForm.get("image")?.errors
  }
  get latError() {
    return this.editArtifactForm.get("lat")?.errors
  }
  get lngError() {
    return this.editArtifactForm.get("lng")?.errors
  }
  get artistError() {
    return this.editArtifactForm.get("artist")?.errors
  }
}
