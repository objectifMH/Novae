import { Component, HostListener } from '@angular/core';
import { faTwitter, faLinkedinIn, faGithub} from '@fortawesome/free-brands-svg-icons';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'novae';
  isShowMenu = false;
  isRotateMenu = false;

  faLinkedinIn = faLinkedinIn;
  faTwitter = faTwitter;
  faGithub = faGithub;

  ngOnInit() {
    AOS.init();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    let element = document.querySelector('header');
    if (window.pageYOffset > element.clientHeight) {
      element.classList.add('opacity_true');
    } else {
      element.classList.remove('opacity_true');
    }
  }

  getShowMenu() {
    this.isShowMenu = !this.isShowMenu;
    this.isRotateMenu = !this.isRotateMenu;
  }
}
