import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  errorMail = false;
  errorPseudo = false;
  errorMdp = false;
  errorMdpConf = false;
  
  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.loginForm = this.fb.group({
      pseudo: [''],
      mail: [''],
      mdp: [''],
      mdpConf: ['']
    });
  }

  ngOnInit(): void {
  }

  onFocusMethod(e) {
    e.srcElement.parentNode.classList.add("focus");
  }

  onBlurMethod(e) {
    let attr = e.target.id;
    if (this.loginForm.value[attr] === "")
      e.srcElement.parentNode.classList.remove("focus");
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm);
      let message =  this.loginForm.value.message + "\n Envoyé de Novae. ";
      

      let formData = new FormData();
      formData.append("pseudo", this.loginForm.value.pseudo);
      formData.append("mail", this.loginForm.value.mail);
      formData.append("mdp", this.loginForm.value.mdp);


      this.httpClient.post("https://formspree.io/f/mknpvgjd", formData).subscribe(
        response => {
          // this.errorMail = this.contactForm.controls.mail.status === "VALID" ? false : true;
          // this.errorMessage = this.contactForm.controls.message.status === "VALID" ? false : true;
          // this.errorNom = this.contactForm.controls.nom.status === "VALID" ? false : true;
          // this.errorPrenom = this.contactForm.controls.prenom.status === "VALID" ? false : true;

          // this.toastr.success(this.contactForm.value.nom + ", Votre message a bien été envoyé ", "Message", {
          //   timeOut: 1800,
          //   progressBar: true,
          //   progressAnimation: 'increasing'
          // })

          this.loginForm = this.fb.group({
            pseudo: [''],
            mail: [''],
            mdp: [''],
            mdpConf: ['']
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
      // this.errorMail = this.contactForm.controls.mail.status === "VALID" ? false : true;
      // this.errorMessage = this.contactForm.controls.message.status === "VALID" ? false : true;
      // this.errorNom = this.contactForm.controls.nom.status === "VALID" ? false : true;
      // this.errorPrenom = this.contactForm.controls.prenom.status === "VALID" ? false : true;
      console.log(this.loginForm);
    }
  }

}
