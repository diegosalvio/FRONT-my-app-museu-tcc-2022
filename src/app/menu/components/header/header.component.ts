import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { throwToolbarMixedModesError } from "@angular/material/toolbar";
import { Router } from "@angular/router";
import { UserService } from "src/app/auth/user/user.service";
import { MuseumService } from "src/app/services/museum.service";
import { DialogComponent } from "../dialog/dialog.component";
import { DialogQrCodeComponent } from "../visit-component/dialog-qr-code/dialog-qr-code.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.components.scss']
})
export class HeaderComponent implements OnInit {

  canReturn: boolean = false

  constructor(
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog,
    private museumService: MuseumService
  ) { }
  ngOnInit(): void {
  }

  logout() {
    this.userService.logout();

    this.router.navigate(['']);

    console.log("SAINDO")
  }

  chooseMuseum() {
    this.router.navigate(['menu/choose-museum'])
  }

  get showReturnButton() {
    return this.museumService.index && this.museumService.showReturn ? this.canReturn = true : this.canReturn = false
  }

  openScanner() {


  }

}
