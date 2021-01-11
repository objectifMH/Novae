import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faFacebook, faGithub, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { OwlOptions } from 'ngx-owl-carousel-o';
import * as AOS from 'aos';
import { InOutService } from '../services/in-out.service';
import { ChangeContext, Options, PointerType } from '@angular-slider/ngx-slider';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  faLinkedinIn = faLinkedinIn;
  faTwitter = faTwitter;
  faGithub = faGithub;
  faFacebook = faFacebook;

  // Carroussel 
  customOptions_actus: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    dots: true,
    navSpeed: 200,
    // navText: ["<span class='material-icons'>arrow_left</span>",
    //  "<span class='material-icons'>arrow_right</span>"],
    responsive: {
      0: {
        items: 1
      },
      490: {
        items: 2, 
      },
      640: {
        items: 3
      }
    },
    nav: false
  }

  customOptions_testimonial: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    dots: true,
    navSpeed: 200,
    // navText: ["<span class='material-icons'>arrow_left</span>",
    //  "<span class='material-icons'>arrow_right</span>"],
    responsive: {
      0: {
        items: 1
      },
      490: {
        items: 1, 
      },
      940: {
        items: 1
      }
    },
    nav: false
  }
  // Fin Carroussel

  // Sliders 
  value: number = 150000;
  optionsSliderMontant: Options = {
    floor: 0,
    ceil: 600000,
    step: 1000,
    translate: (value: number): string => {
      return value+"€";
    }
  };

  minValue=15;
  optionsSliderDuree: Options = {
    floor: 2,
    ceil: 30,
    step: 1,
    translate: (value: number): string => {
      return value+"ans";
    }
  };


  textDuree = '';
  textMontant = '';
  textTaux = '0.82';
  textAssurance = '0.34';
  mensualite = "0"
  //Fin Sldiders

  
  isIos = false; 

  errorMail = false;
  errorNom = false;
  errorMessage = false;
  errorPrenom = false;
  plateforme: string = ""; 

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
    this.plateforme = this.inout.getPlatform();
    if (/iP(hone|od|ad)/.test(navigator.platform))
    {
      this.isIos = true; 
      console.log(this.isIos, navigator.platform);
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    let chiffres = document.querySelector('.chiffres');

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

  onFocusMethod(e) {
    e.srcElement.parentNode.classList.add("focus");
  }

  onBlurMethod(e) {
    let attr = e.target.id;
    if (this.contactForm.value[attr] === "")
      e.srcElement.parentNode.classList.remove("focus");
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log(this.contactForm);
      let message =  this.contactForm.value.message + "\n Envoyé de Novae. ";
      

      let formData = new FormData();
      formData.append("name", this.contactForm.value.nom);
      formData.append("prenom", this.contactForm.value.prenom);
      formData.append("email", this.contactForm.value.mail);
      formData.append("message", message);


      this.httpClient.post("https://formspree.io/f/mknpvgjd", formData).subscribe(
        response => {
          this.errorMail = this.contactForm.controls.mail.status === "VALID" ? false : true;
          this.errorMessage = this.contactForm.controls.message.status === "VALID" ? false : true;
          this.errorNom = this.contactForm.controls.nom.status === "VALID" ? false : true;
          this.errorPrenom = this.contactForm.controls.prenom.status === "VALID" ? false : true;

          // this.toastr.success(this.contactForm.value.nom + ", Votre message a bien été envoyé ", "Message", {
          //   timeOut: 1800,
          //   progressBar: true,
          //   progressAnimation: 'increasing'
          // })

          this.contactForm = this.fb.group({
            nom: [''],
            prenom: [''],
            mail: [''],
            message: ['']
          });

          let form_inputs = document.querySelectorAll('.form-group');
          form_inputs.forEach(element => { 
            element.classList.remove("focus");
          });

        },
        error => {
          console.log(error);
        }
      );
    }
    else {
      this.errorMail = this.contactForm.controls.mail.status === "VALID" ? false : true;
      this.errorMessage = this.contactForm.controls.message.status === "VALID" ? false : true;
      this.errorNom = this.contactForm.controls.nom.status === "VALID" ? false : true;
      this.errorPrenom = this.contactForm.controls.prenom.status === "VALID" ? false : true;
    }
  }



  // SLIDERS 
  logText: string = '';
  logTextDuree:  string = '';

  // Montant 
  onUserChangeStart(changeContext: ChangeContext): void {
    this.logText += `onUserChangeStart(${this.getChangeContextString(changeContext)})\n`;
  }

  onUserChange(changeContext: ChangeContext): void {
    this.logText += `onUserChange(${this.getChangeContextString(changeContext)})\n`;
  }

  onUserChangeEnd(changeContext: ChangeContext): void {
    this.logText += `onUserChangeEnd(${this.getChangeContextString(changeContext)})\n`;
    this.textMontant =  changeContext.value.toString();
    this.getMensualite();
  }

  getChangeContextString(changeContext: ChangeContext): string {
    return `{pointerType: ${changeContext.pointerType === PointerType.Min ? 'Min' : 'Max'}, ` +
           `value: ${changeContext.value}}`;
  }

  // Durée 
  onUserChangeStartDuree(changeContext: ChangeContext): void {
    this.logTextDuree += `onUserChangeStart(${this.getChangeContextString(changeContext)})\n`;
  }

  onUserChangeDuree(changeContext: ChangeContext): void {
    this.logTextDuree += `onUserChange(${this.getChangeContextString(changeContext)})\n`;
    
   }

  onUserChangeEndDuree(changeContext: ChangeContext): void {
    this.logTextDuree += `onUserChangeEnd(${this.getChangeContextString(changeContext)})\n`;
    this.textDuree =  changeContext.value.toString();
    this.getTaux();
  }

  getChangeContextStringDuree(changeContext: ChangeContext): string {
    return `{pointerType: ${changeContext.pointerType === PointerType.Min ? 'Min' : 'Max'}, ` +
           `value: ${changeContext.value}}`;
  }

  // Taux 
  getTaux(){
    let duree = parseInt(this.textDuree);
    let taux = 0.61;
    if (duree < 10) {
      taux = 0.61;
    }
    if ( duree >= 10 && duree <= 11 )
    {
      taux = 0.66;
    }
    if ( duree >= 12 && duree <= 14 )
    {
      taux = 0.75;
    }
    if ( duree >= 15 && duree <= 19 )
    {
      taux = 0.82;
    }
    if ( duree >= 20 && duree <= 24 )
    {
      taux = 1.02;
    }
    if ( duree >= 25 && duree <= 29 )
    {
      taux = 1.28;
    }
    if ( duree === 30 )
    {
      taux = 2.59;
    }

    this.textTaux = taux.toString();
    this.getMensualite();

  }
  
  getMensualite() {
    let montant = parseInt(this.textMontant);
    let duree = parseInt(this.textDuree);
    let assurance = parseInt(this.textAssurance);
    let taux = parseInt(this.textTaux);
    let mensualite;

    mensualite =  (montant / ( duree * 12 )) ;
    this.mensualite = Math.round(mensualite).toString();
  }

}
