import { Component, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { Router } from "@angular/router";
import { UserService } from "src/app/auth/user/user.service";
import { DialogComponent } from "../dialog/dialog.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.components.scss']
})
export class HeaderComponent {

  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger

  constructor(
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog
     ) {}

  logout() {
    this.userService.logout();

    this.router.navigate(['']);

    console.log("SAINDO")
  }


  openDialog(title: string, body: string, action: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      restoreFocus: false,
      data: {
        title: title,
        body: body,
        action: action
      }
    },
    )

    dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus())
  }

  chooseMuseum() {
    this.router.navigate(['menu/choose-museum'])
  }
}
