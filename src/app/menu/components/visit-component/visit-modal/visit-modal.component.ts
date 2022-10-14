import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Artifact } from 'src/app/interfaces/artifact';
import { MuseumService } from './../../../../services/museum.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';
import { catchError, debounceTime, map, Observable, of, tap } from 'rxjs';
import { Artist } from 'src/app/interfaces/artist';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-visit-modal',
  templateUrl: './visit-modal.component.html',
  styleUrls: ['./visit-modal.component.scss']
})
export class VisitModalComponent implements OnInit {

  museuInfo = this.museumService.museumModel
  artifactModel!: Artifact[]
  artistModel!: any
  canLoad: boolean = true
  index: number = 0
  imageTest = "https://artsoul.us-east-1.linodeobjects.com/artworks/e47JA3tB5jcDKudqKudDNt23032022033025.webp"
  artist$!: Observable<Artist>
  artistName: string = ""
  url_maps = environment.MAPS_KEY

  constructor(
    private museumService: MuseumService,
    private router: Router,
    http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadingContent()
  }

    nextOnTheList() {
      const index = this.artifactModel.length - 1
      if(this.index < index) {
        this.index = this.index + 1

        if(this.index == 0) {
          this.imageTest = "https://artsoul.us-east-1.linodeobjects.com/artworks/e47JA3tB5jcDKudqKudDNt23032022033025.webp"
        } else if (this.index == 1) {
          this.imageTest = "https://s.ebiografia.com/img/ta/rs/tarsila_do_amaral_composia_a_ofigura_sa.jpg"
        }

      } else console.log("Vai para a página final")
    }
    previousOnTheList() {
      if(this.index > 0) {
        this.index = this.index - 1

        if(this.index == 0) {
          this.imageTest = "https://artsoul.us-east-1.linodeobjects.com/artworks/e47JA3tB5jcDKudqKudDNt23032022033025.webp"
        } else if (this.index == 1) {
          this.imageTest = "https://s.ebiografia.com/img/ta/rs/tarsila_do_amaral_composia_a_ofigura_sa.jpg"
        }
      } else console.log("Aparece um modal de opções para reiniciar ou fechar")
    }

    loadingContent() {
      setTimeout(() => {
        this.canLoad = false
        this.artifactModel = this.museumService.artifactModel
        console.log("O que chegou: ", this.artifactModel)
        this.getArtist()
        if (this.artifactModel === undefined) {
          this.router.navigate(["menu/choose-museum"])
          }
      }, 300)
    }

    getArtist() {
      try {
        this.artist$ = this.museumService.getOneArtist(this.artifactModel[this.index].artist)
        this.artist$.subscribe(
          resp => this.artistName = resp.name
        )
      } catch (error) {
        console.log(error)
        this.router.navigate(["menu/choose-museum"])
      }
    }
}
