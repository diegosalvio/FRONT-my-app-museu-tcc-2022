import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "src/app/auth/user/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.components.scss']
})
export class HeaderComponent {


  constructor(
    private userService: UserService,
    private router: Router
     ) {}

  logout() {
    this.userService.logout();

    this.router.navigate(['']);

    console.log("SAINDO")
  }

}
