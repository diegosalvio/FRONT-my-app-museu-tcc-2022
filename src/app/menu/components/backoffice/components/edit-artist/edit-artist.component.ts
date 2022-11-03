import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MuseumService } from 'src/app/services/museum.service';
import { Artist } from 'src/app/interfaces/artist';
import { ArtistService } from 'src/app/services/artist.service';

@Component({
  selector: 'app-edit-artist',
  templateUrl: './edit-artist.component.html',
  styleUrls: ['./edit-artist.component.scss']
})
export class EditArtistComponent implements OnInit {

  editArtistForm!: FormGroup
  artist$!: Observable<Artist[]>

  constructor(
    private fb: FormBuilder,
    private museumService: MuseumService,
    private artistService: ArtistService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getArtists()
    this.editArtistForm = this.fb.group({
      id: ["", [Validators.required]],
      name: ["", [Validators.required, Validators.minLength(3)]],
      birthDate: ["", [Validators.required]],
      informationAbout: ["", [Validators.required, Validators.maxLength(500)]],
      portrait: ["", [Validators.required]]
    })
    this.setEnablesDisables()
  }

  getArtists() {
    this.artist$ = this.artistService.getArtists("6339dbdef5747cb44694313f")
  }

  getArtist() {
    const idArtist = this.editArtistForm.get("id")?.value

    this.artistService.getArtist(idArtist).subscribe({
      next: (res) => {
        this.editArtistForm.patchValue({
          name: res.name,
          birthDate: res.birthDate,
          informationAbout: res.informationAbout,
          portrait: res.portrait
        })
      }
    })
  }

  setEnablesDisables() {
    this.editArtistForm.disable()
    this.editArtistForm.get("id")?.enable()
  }

  submitEditedArtist() {
    if (this.editArtistForm.valid) {
      const idArtist = this.editArtistForm.get("id")?.value
      const editedArtist: Artist = {
        name: this.editArtistForm.get("name")?.value,
        birthDate: this.editArtistForm.get("birthDate")?.value,
        informationAbout: this.editArtistForm.get("informationAbout")?.value,
        portrait: this.editArtistForm.get("portrait")?.value
      }

      this.artistService.updateArtist(idArtist, editedArtist).subscribe({
        next: (res) => {
          console.log("O artista teve suas informações alteradas: ", res)
        },
        error: (error) => {
          console.log(error)
        },
        complete: () => this.snackbar.open("Edição feita com sucesso!", "fechar").afterDismissed().subscribe(
          () => {
            this.editArtistForm.reset()
          }
        )
      })
    }
  }

  editInput(control: string) {
    if (this.editArtistForm.get("id")?.valid) {
      this.editArtistForm.get(control)?.enable()
    }
  }

  get idArtistError() {
    return this.editArtistForm.get("id")?.errors
  }

  get nameError() {
    return this.editArtistForm.get("name")?.errors
  }
  get birthDateError() {
    return this.editArtistForm.get("birthDate")?.errors
  }
  get informationAboutError() {
    return this.editArtistForm.get("informationAbout")?.errors
  }
  get portraitError() {
    return this.editArtistForm.get("portrait")?.errors
  }
}
