import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InOutService {

  listCustomer = [
    { pseudo: "mario", mdp: "mdpmdp", role: "USER" },
    { pseudo: "meruem", mdp: "mdpmdp", role: "SUPERADMIN" },
    { pseudo: "motoko", mdp: "mdpmdp", role: "ADMIN" },
    { pseudo: "moto", mdp: "mdpmdp", role: "USER" }
  ]

  loginAuthenticated = null;

  constructor() { }

  getPlatform() {
    return navigator.platform;
  }

  getRecord(formLogin: FormData) {
    console.log("Enregistrement", formLogin);
    let pseudoData = formLogin.get("pseudo").toString();
    let mdpData = formLogin.get("mdp").toString();
    
    let isRecord = this.listCustomer.some((element, index) => (element.pseudo === formLogin.get("pseudo")));
    
    if ( !isRecord) {
      this.listCustomer = [...this.listCustomer, {pseudo : pseudoData, mdp: mdpData, role: "USER" }];
    }
    //console.log("isRecord", isRecord, "Liste de customers :", this.listCustomer);
    return isRecord;
  }

  getLogin(formLogin: FormData) {
    let pseudoData = formLogin.get("pseudo").toString();
    let mdpData = formLogin.get("mdp").toString();
    let result = false;

    this.listCustomer.forEach(element => {
    let pseudoData = formLogin.get("pseudo").toString();
      if (element.pseudo === pseudoData && element.mdp === mdpData){
        this.loginAuthenticated = {pseudo : pseudoData, mdp: mdpData, role: "USER" };
        result = true;
      }
    })
    console.log(this.loginAuthenticated);
    return result;
  }

  public setLoginAuthenticated(resultat) {
    this.loginAuthenticated = resultat;
  }

  public getLoginAuthenticated() {
    return this.loginAuthenticated;
  }
}
