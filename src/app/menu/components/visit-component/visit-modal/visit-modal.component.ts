import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Artifact } from 'src/app/interfaces/artifact';
import { MuseumService } from './../../../../services/museum.service';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';
import { catchError, debounceTime, map, Observable, of, tap } from 'rxjs';
import { Artist } from 'src/app/interfaces/artist';
import { environment } from 'src/environments/environment';
import { DialogComponent } from '../../dialog/dialog.component';

@Component({
  selector: 'app-visit-modal',
  templateUrl: './visit-modal.component.html',
  styleUrls: ['./visit-modal.component.scss']
})
export class VisitModalComponent implements OnInit, OnDestroy {

  museuInfo = this.museumService.museumModel
  artifactModel!: Artifact[]
  artistModel!: any
  canLoad: boolean = true
  index: number = 0
  artist$!: Observable<Artist>
  artistName: string = ""
  artistPortrait: string = ""
  url_maps = environment.MAPS_KEY
  lat!: number
  lng!: number
  center!: google.maps.LatLngLiteral
  zoom = 21
  position!: any

  constructor(
    private museumService: MuseumService,
    private router: Router,
    http: HttpClient,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.museumService.showReturn = false
    this.getUserGeolocation()
    this.loadingContent()
    if(this.museumService.index) {
      this.index = this.museumService.index
      console.log("onInit index: ", this.index)
    }
  }

  ngOnDestroy(): void {
    this.museumService.showReturn = true
  }

  nextOnTheList() {
    const index = this.artifactModel.length - 1
    if (this.index < index) {
      this.index = this.index + 1
      this.museumService.index = this.index
    } else console.log("Vai para a página final")
  }
  previousOnTheList() {
    if (this.index > 0) {
      this.index = this.index - 1
      this.museumService.index = this.index
    } else {
      console.log("Aparece um modal de opções para reiniciar ou fechar")
      this.dialog.open(DialogComponent, {
        data: {
          title: "Atenção!",
          body: "Tem certeza que deseja voltar?",
          action: "Voltar"
        }
      }).afterClosed().subscribe(res => {
        if(res) {
          this.router.navigate(["menu/choose-museum"])
        }
      })
    }
  }

  loadingContent() {
    setTimeout(() => {
      this.canLoad = false
      this.artifactModel = this.museumService.artifactModel
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
        (resp) => {
          this.artistName = resp.name
          this.artistPortrait = resp.portrait
        }
      )
    } catch (error) {
      console.log(error)
      this.router.navigate(["menu/choose-museum"])
    }
  }

  getUserGeolocation() {
    if (!navigator.geolocation) {
      console.log("Você não poderá localizar as obras se não permitir acesso a sua localização")
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords)
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    }
  }
}
