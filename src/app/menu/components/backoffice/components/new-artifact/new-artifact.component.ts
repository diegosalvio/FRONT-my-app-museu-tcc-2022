import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Observable, startWith } from 'rxjs';
import { ArtistService } from 'src/app/services/artist.service';
import { MuseumService } from 'src/app/services/museum.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { Museum } from 'src/app/interfaces/museum';
import { Artist } from 'src/app/interfaces/artist';
import { ArtifactService } from 'src/app/services/artifact.service';
import { Artifact } from 'src/app/interfaces/artifact';

@Component({
  selector: 'app-new-artifact',
  templateUrl: './new-artifact.component.html',
  styleUrls: ['./new-artifact.component.scss']
})
export class NewArtifactComponent implements OnInit {

  @Input() museum: string | undefined

  artifactForm!: FormGroup
  idMuseum!: string | undefined
  artist$!: Observable<Artist[]>
  artist!: Artist[]

  constructor(
    private formBuilder: FormBuilder,
    private museumService: MuseumService,
    private artistService: ArtistService,
    private artifactService: ArtifactService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMuseum()

    this.artifactForm = this.formBuilder.group({
      title: ["", [Validators.required, Validators.minLength(3)]],
      date: ["", [Validators.required]],
      informationAbout: ["", [Validators.required, Validators.maxLength(5000)]],
      image: ["", [Validators.required]],
      lat: ["", [Validators.required]],
      lng: ["", [Validators.required]],
      artist: ["", [Validators.required]]
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
        this.getArtists()
      }
    })
  }

  getArtists() {
    this.artistService.getArtists(this.idMuseum).subscribe({
      next: (res) => {
        this.artist = res
      },
      error: (error) => {
        console.log(error)
      },
      complete: () => {
        this.artist$ = this.artifactForm.get("artist")!.valueChanges.pipe(
          startWith(""),
          map(value => (value ? this._filter(value) : this.artist.slice()))
        )
      }
    })
  }

  private _filter(value: string): Artist[] {
    const filterValue = value;

    return this.artist.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  submitArtifact() {
    console.log(this.artifactForm.getRawValue())

    if(this.artifactForm.valid && this.idMuseum != undefined) {
      const artist: Artist = this.artifactForm.get("artist")?.value
      const newArtifact: Artifact = {
        title: this.artifactForm.get("title")?.value,
        date: this.artifactForm.get("date")?.value,
        informationAbout: this.artifactForm.get("informationAbout")?.value,
        image: this.artifactForm.get("image")?.value,
        geolocation: {
          lat: this.artifactForm.get("lat")?.value,
          lng: this.artifactForm.get("lng")?.value
        },
        artist: artist._id ?? "",
        museum: this.idMuseum ?? ""
      }

      this.artifactService.newArtifact(newArtifact).subscribe({
        next: (res) => {
          console.log("A seguinte obra foi cadastrada: ", res)
        },
        error: (error) => {
          this.openSnackBar(error, "X")
        },
        complete: () => {
          this.openSnackBar("Obra cadastrada com sucesso", "X")
        }
      })
    }
  }

  displayProperty(value: Artist) {
    return value && value.name ? value.name : ""
  }

  selectedArtist(event: any) {
    console.log(event.option.value);
  }

  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 1000
    })
  }

  get titleError() {
    return this.artifactForm.get("title")?.errors
  }
  get dateError() {
    return this.artifactForm.get("date")?.errors
  }
  get informationAboutError() {
    return this.artifactForm.get("informationAbout")?.errors
  }
  get imageError() {
    return this.artifactForm.get("image")?.errors
  }
  get latError() {
    return this.artifactForm.get("lat")?.errors
  }
  get lngError() {
    return this.artifactForm.get("lng")?.errors
  }
  get artistError() {
    return this.artifactForm.get("artist")?.errors
  }

}
