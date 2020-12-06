import { HttpClient } from '@angular/common/http';
import { isNgContainer } from '@angular/compiler';
import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { counter } from '@fortawesome/fontawesome-svg-core';
import { faTwitter, faLinkedinIn, faGithub, faFacebook } from '@fortawesome/free-brands-svg-icons';
import * as AOS from 'aos';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { InOutService } from './services/in-out.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'novae';
  isShowMenu = false;
  isRotateMenu = false;

  firstMenuNav = 0;

  faLinkedinIn = faLinkedinIn;
  faTwitter = faTwitter;
  faGithub = faGithub;
  faFacebook = faFacebook;

  // customOptions_actus: OwlOptions = {
  //   loop: true,
  //   mouseDrag: true,
  //   touchDrag: true,
  //   pullDrag: true,
  //   autoplay: true,
  //   dots: true,
  //   navSpeed: 200,
  //   // navText: ["<span class='material-icons'>arrow_left</span>",
  //   //  "<span class='material-icons'>arrow_right</span>"],
  //   responsive: {
  //     0: {
  //       items: 1
  //     },
  //     490: {
  //       items: 2, 
  //     },
  //     640: {
  //       items: 3
  //     }
  //   },
  //   nav: false
  // }

  // customOptions_testimonial: OwlOptions = {
  //   loop: true,
  //   mouseDrag: true,
  //   touchDrag: true,
  //   pullDrag: true,
  //   autoplay: true,
  //   dots: true,
  //   navSpeed: 200,
  //   // navText: ["<span class='material-icons'>arrow_left</span>",
  //   //  "<span class='material-icons'>arrow_right</span>"],
  //   responsive: {
  //     0: {
  //       items: 1
  //     },
  //     490: {
  //       items: 1, 
  //     },
  //     940: {
  //       items: 1
  //     }
  //   },
  //   nav: false
  // }

  
  errorMail = false;
  errorNom = false;
  errorMessage = false;
  errorPrenom = false;

  plateforme="";
  isIos= true;

  contactForm: FormGroup;
  
  constructor(private fb: FormBuilder, private httpClient: HttpClient, private inout: InOutService) {
    this.contactForm = this.fb.group({
      nom: [''],
      prenom: [''],
      mail: [''],
      message: ['']
    });
  }

  ngOnInit() {
    AOS.init();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    let header = document.querySelector('header');
    // let chiffres = document.querySelector('.chiffres');

    if (window.pageYOffset > header.clientHeight) {
      header.classList.add('opacity_true');
    } else {
      header.classList.remove('opacity_true');
    }
  }

  getShowMenu() {
    this.isShowMenu = !this.isShowMenu;
    this.isRotateMenu = !this.isRotateMenu;
    this.firstMenuNav++;
  }

  closeMenu() {
    this.isShowMenu = false;
  }

  



}
