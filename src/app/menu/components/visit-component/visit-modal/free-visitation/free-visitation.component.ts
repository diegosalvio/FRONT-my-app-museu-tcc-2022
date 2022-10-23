import { MatDialog } from '@angular/material/dialog';
import { Artist } from './../../../../../interfaces/artist';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Component, OnChanges, OnInit } from '@angular/core';
import { MuseumService } from 'src/app/services/museum.service';
import { TypeVisit } from 'src/app/interfaces/visitation';
import { Artifact } from 'src/app/interfaces/artifact';
import { DialogQrCodeComponent } from '../../dialog-qr-code/dialog-qr-code.component';

@Component({
  selector: 'app-free-visitation',
  templateUrl: './free-visitation.component.html',
  styleUrls: ['./free-visitation.component.scss']
})
export class FreeVisitationComponent implements OnInit {
  visitationModel!: Array<TypeVisit>
  museumModel!: any
  artifactModel$!: Observable<Artifact>
  artistModel$!: Observable<Artist>
  id: string = ""

  constructor(
    private museumService: MuseumService,
    private router: Router,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadContent()
  }
  loadContent() {
    this.openScanner()
    setTimeout(() => {
      this.visitationModel = this.museumService.visitationModel
      this.getArtifact()
    }, 300)
  }

  getArtifact() {
    try {
      this.artifactModel$ = this.museumService.getOneArtifact(this.id)
        .pipe(
          tap((res) => {
            this.artistModel$ = this.museumService.getOneArtist(res.artist)
          })
        )
    } catch (error) {
      console.log("Erro no método: ", error)
      this.router.navigate(["menu/choose-museum"])
    }
  }

  openScanner() {
    this.matDialog.open(DialogQrCodeComponent, { disableClose: true }).afterClosed().subscribe((res)=> {
      this.id = res
      this.getArtifact()
    })
  }
}
