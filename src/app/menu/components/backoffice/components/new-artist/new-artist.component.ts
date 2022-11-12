import { Museum } from 'src/app/interfaces/museum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { Artist } from 'src/app/interfaces/artist';
import { MuseumService } from 'src/app/services/museum.service';
import { ArtistService } from 'src/app/services/artist.service';

@Component({
  selector: 'app-new-artist',
  templateUrl: './new-artist.component.html',
  styleUrls: ['./new-artist.component.scss']
})
export class NewArtistComponent implements OnInit {


  @Input() museum: string | undefined

  artistForm!: FormGroup
  private idMuseum!: string | undefined

  constructor(
    private formBuilder: FormBuilder,
    private museumService: MuseumService,
    private artistService: ArtistService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMuseum()

    this.artistForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      birthDate: ["", [Validators.required]],
      informationAbout: ["", [Validators.required, Validators.maxLength(500)]],
      portrait: ["", [Validators.required]]
    })
  }

  getMuseum() {
    this.museumService.getOneMuseumByName(this.museum).subscribe({
        next: (res: Museum) => {
          this.idMuseum = res?._id
        },
        error: (error) => {
          console.log(error)
        },
        complete: () => {
          console.log("id do museu coletada")
        }
      })
  }

  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 1000
    })
  }

  submitArtist() {
    console.log(this.idMuseum)
    if (this.artistForm.valid) {
      const newArtist: Artist = {
        name: this.artistForm.get("name")?.value,
        birthDate: this.artistForm.get("birthDate")?.value,
        informationAbout: this.artistForm.get("informationAbout")?.value,
        portrait: this.artistForm.get("portrait")?.value,
        museum: this.idMuseum
      }
      console.log(newArtist)
      this.artistService.newArtist(newArtist).subscribe(
        {
          complete: () => {
            console.log("Artista Cadastrado")
          },
          error: (error) => {
            const message = error
            this.openSnackBar(message, "x")
          }
        }
      )
    }
  }

  get nameError() {
    return this.artistForm.get("name")?.errors
  }
  get birthDateError() {
    return this.artistForm.get("birthDate")?.errors
  }
  get informationAboutError() {
    return this.artistForm.get("informationAbout")?.errors
  }
  get portraitError() {
    return this.artistForm.get("portrait")?.errors
  }
}
