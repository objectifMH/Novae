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
  recordForm: FormGroup;

  errorMail = false;
  errorPseudo = false;
  errorMdp = false;
  errorMdpConf = false;

  isSeConnecterIn = false; 
  isSeConnecterUp = true; 
  
  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.recordForm = this.fb.group({
      pseudoUp: [''],
      mailUp: [''],
      mdpUp: [''],
      mdpConfUp: ['']
    });

    this.loginForm = this.fb.group({
      pseudoIn: [''],
      mdpIn: ['']
    });
  }

  ngOnInit(): void {
  }

  onFocusMethod(e) {
    e.srcElement.parentNode.classList.add("focus");
  }

  onBlurMethod(e) {
    let attr = e.target.id;
    if (this.recordForm.value[attr] === "")
      e.srcElement.parentNode.classList.remove("focus");

      let attr_login = e.target.id;
    if (this.loginForm.value[attr_login] === "")
      e.srcElement.parentNode.classList.remove("focus");
  }

  onSubmit() {
    if (this.recordForm.valid) {
      console.log(this.recordForm);
      let message =  this.recordForm.value.message + "\n Envoyé de Novae. ";
      

      let formData = new FormData();
      formData.append("pseudo", this.recordForm.value.pseudo);
      formData.append("mail", this.recordForm.value.mail);
      formData.append("mdp", this.recordForm.value.mdp);


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

          this.recordForm = this.fb.group({
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
      console.log(this.recordForm);
    }
  }

  toggle_in() {
    console.log("toggle in ", this.isSeConnecterIn,this.isSeConnecterUp);
    this.isSeConnecterIn = false; 
    this.isSeConnecterUp = true; 

  }

  toggle_up() {
    console.log("toggle up ", this.isSeConnecterIn,this.isSeConnecterUp);
    this.isSeConnecterIn = true; 
    this.isSeConnecterUp = false;  
  }


}
