import { isNgContainer } from '@angular/compiler';
import { Component, HostListener } from '@angular/core';
import { counter } from '@fortawesome/fontawesome-svg-core';
import { faTwitter, faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';
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
    let header = document.querySelector('header');
    let chiffres = document.querySelector('.chiffres');

    if (window.pageYOffset > header.clientHeight) {
      header.classList.add('opacity_true');
    } else {
      header.classList.remove('opacity_true');
    }

    if (window.pageYOffset > (chiffres.clientHeight + 400)) {  
      document.querySelectorAll(".counter").forEach(counter_element => {
        let count = parseInt(counter_element.getAttribute('data-count'));

        let updateCount = setInterval(() => {
          let divContent = parseInt(counter_element.innerHTML);
          let increaseBy = count / 250 ; 
          let increase = Math.ceil(divContent + increaseBy);
          if ( divContent < count ) {
            counter_element.innerHTML = increase.toString(); 
          }
          else {
            counter_element.innerHTML  = count.toString(); 
            clearInterval(updateCount);
          }
        })
      })
    } 
    else {
      document.querySelectorAll(".counter").forEach(counter_element => {
        counter_element.innerHTML = "0"; 
      })

    }



  }

  getShowMenu() {
    this.isShowMenu = !this.isShowMenu;
    this.isRotateMenu = !this.isRotateMenu;
  }


}
