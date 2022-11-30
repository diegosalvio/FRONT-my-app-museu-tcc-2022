import { OverlayContainer } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import { Component, HostBinding, Inject, OnInit, Renderer2 } from '@angular/core';
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
    private router: Router,
    private overlay: OverlayContainer,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {
    const mapsScript = document.createElement('script')
    mapsScript.setAttribute('async', '');
    mapsScript.src = `${this.url_maps}`
    mapsScript.addEventListener('load', () => {
    })
    document.head.appendChild(mapsScript);
  }

  ngOnInit(): void {
    this.renderer.setAttribute(this.document.body, "class", "theme-light")
  }

  switchMode(isDarkMode: any) {
    console.log(isDarkMode)
    const hostClass = isDarkMode ? "theme-dark" : "theme-light"
    this.renderer.setAttribute(this.document.body, "class", hostClass)
  }

  logout() {
    this.userService.logout();

    this.router.navigate(['']);

    console.log("SAINDO")
  }

}
