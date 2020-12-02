import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faFacebook, faGithub, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { OwlOptions } from 'ngx-owl-carousel-o';
import * as AOS from 'aos';


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

  
  errorMail = false;
  errorNom = false;
  errorMessage = false;
  errorPrenom = false;

  contactForm: FormGroup;
  
  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
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

}
