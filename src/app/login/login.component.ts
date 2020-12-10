import { NumberSymbol } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InOutService } from '../services/in-out.service';
import { mdpValidator } from './validators';

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

  errorPseudoIn = false;
  errorMdpIn = false;

  isSeConnecterIn = false;
  isSeConnecterUp = true;

  isPseudoExisting = false;
  isAuthenticated = false;
  isRecording = false;
  profilAuthenticated = { pseudo: "", mdp: "", role: "USER", mail:"" };

  constructor(private fb: FormBuilder, private httpClient: HttpClient, private inout: InOutService, private router: Router) {
    this.recordForm = this.fb.group({
      pseudoUp: [''],
      mailUp: [''],
      mdpUp: ['', Validators.minLength(4)],
      mdpConfUp: ['', mdpValidator]
    });

    this.loginForm = this.fb.group({
      pseudoIn: [''],
      mdpIn: ['']
    });

    //si on change le mdp on update l'état de la confirmation : 
    this.recordForm.controls.mdpUp.valueChanges.subscribe(
      x => this.recordForm.controls.mdpConfUp.updateValueAndValidity()
    );
  }

  ngOnInit(): void {
    // est ce qu'on est authentifié ? 
    this.getIsAuthenticated();

    // qui est authentifié ?
    this.getLoginAuthenticated();
  }

  getIsAuthenticated() {
    this.inout.getIsAuthenticated().subscribe(
      success => {
        this.isAuthenticated = success;

        if (success === true) {
          setTimeout(() => {
            this.router.navigate(['/profil']);
          }, 2500)
        }
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

  onSubmitRecord() {
    this.errorPseudo = false;
    if (this.recordForm.valid) {

      let formData = new FormData();
      formData.append("pseudo", this.recordForm.value.pseudoUp);
      formData.append("mail", this.recordForm.value.mailUp);
      formData.append("mdp", this.recordForm.value.mdpUp);

      let recording = this.inout.getRecord(formData);
      if (recording === false) {

        this.isRecording = true;
        this.isPseudoExisting = false;

        setTimeout(() => {

          // les spans reviennent au niveau du placeholder
          let form_inputs = document.querySelectorAll('.form-group');
          form_inputs.forEach(element => {
            element.classList.remove("focus");
          });

          // on remet à 0 les inputs du formulaire 
          this.recordForm.reset();

        }, 4000)
      }
      else {
        //console.log("Dans On submit Record : pseudo pas disponible", recording, this.recordForm.get('pseudoUp') );
        this.isPseudoExisting = true;
        this.errorPseudo = true;
        this.isRecording = false;
      }
    }
    else {
      this.isPseudoExisting = false;
      this.isRecording = false;
      this.recordForm.markAllAsTouched();
    }
  }

  onSubmitLogin() {
    this.errorPseudoIn = false;
    this.errorMdpIn = false;

    if (this.loginForm.status === "VALID") {

      let formData = new FormData();
      formData.append("pseudo", this.loginForm.value.pseudoIn);
      formData.append("mdp", this.loginForm.value.mdpIn);

      let res = this.inout.getLogin(formData);

      if (res["source"]["_value"] === false) {
        console.log("ON est rentrer dedans");
        this.errorPseudoIn = true;
        this.errorMdpIn = true;
      }
    }
    else {
      this.loginForm.markAllAsTouched();
    }
  }

  toggle_in() {
    console.log("toggle in ", this.isSeConnecterIn, this.isSeConnecterUp);
    this.isSeConnecterIn = false;
    this.isSeConnecterUp = true;
    this.recordForm.reset();
    this.loginForm.reset();

  }

  toggle_up() {
    console.log("toggle up ", this.isSeConnecterIn, this.isSeConnecterUp);
    this.isSeConnecterIn = true;
    this.isSeConnecterUp = false;
    this.recordForm.reset();
    this.loginForm.reset();
  }


}
