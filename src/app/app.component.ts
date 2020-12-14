import { HttpClient } from '@angular/common/http';
import { isNgContainer } from '@angular/compiler';
import { ChangeDetectorRef } from '@angular/core';
import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { counter } from '@fortawesome/fontawesome-svg-core';
import { faTwitter, faLinkedinIn, faGithub, faFacebook } from '@fortawesome/free-brands-svg-icons';
import * as AOS from 'aos';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
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

  plateforme = "";
  isIos = true;

  isAuthenticated;
  profilAuthenticated;
  isProfil = false;

  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private httpClient: HttpClient,
    private cdRef: ChangeDetectorRef,
    private route: ActivatedRoute, private router: Router,
    private inout: InOutService) {
    this.contactForm = this.fb.group({
      nom: [''],
      prenom: [''],
      mail: [''],
      message: ['']
    });

    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.inout.setIsProfil(false);
      }
    });

    
  }

  ngOnInit() {
    AOS.init();
    this.getIsAuthenticated();
    this.getLoginAuthenticated();
    this.inout.setIsProfil(false);
    this.getIsProfil();
  }

  ngAfterContentChecked(): void {
    this.cdRef.detectChanges();
  }

  getIsProfil() {
    this.inout.getIsProfil().subscribe(
      success => {
        //console.log("avant", success, this.isProfil);
        this.isProfil = success;
        //console.log("apres", success, this.isProfil);
      },
      error => {
        console.log(error);
      }
    )
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    let header = document.querySelector('header');
    // let chiffres = document.querySelector('.chiffres');
    if (header)
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

  getIsAuthenticated() {
    this.inout.getIsAuthenticated().subscribe(
      success => {
        setTimeout(() => {
          this.isAuthenticated = success;
        }, 2500)
      },
      error => {
        console.log(error);
      }
    )
  }

  getLoginAuthenticated() {
    this.inout.getProfilAuthenticated().subscribe(
      success => {
        this.profilAuthenticated = success;
      },
      error => {
        console.log(error);
      }
    )
  }





}
