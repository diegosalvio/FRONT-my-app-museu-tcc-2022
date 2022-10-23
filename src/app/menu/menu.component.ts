import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserService } from '../auth/user/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  url_maps = environment.MAPS_KEY

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    const mapsScript = document.createElement('script')
    mapsScript.setAttribute('async', '');
    mapsScript.src = `${this.url_maps}`
    mapsScript.addEventListener('load', () => {
    })
    document.head.appendChild(mapsScript);
  }

  ngOnInit(): void {
  }

  logout() {
    this.userService.logout();

    this.router.navigate(['']);

    console.log("SAINDO")
  }

}
