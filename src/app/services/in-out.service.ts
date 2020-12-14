import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InOutService {

  listCustomer = [
    { pseudo: "mario", mdp: "mdpmdp", role: "USER", mail:"mario@gmail.fr" },
    { pseudo: "meruem", mdp: "mdpmdp", role: "SUPERADMIN", mail:"meruem@hunter.fr"},
    { pseudo: "motoko", mdp: "mdpmdp", role: "ADMIN", mail:"motoko@gits.jp"},
    { pseudo: "moto", mdp: "mdpmdp", role: "USER" , mail:"moto@gmail.gp" }
  ]

  profilAuthenticated: BehaviorSubject<any>;
  isAuthenticated: BehaviorSubject<boolean>;
  isProfil: BehaviorSubject<boolean>;

  constructor() { 
    this.profilAuthenticated = new BehaviorSubject<any>({pseudo : "", mdp: "", role: "USER", mail:"" });
    this.isAuthenticated = new BehaviorSubject<boolean>(false);
    this.isProfil = new BehaviorSubject<boolean>(false);

  }

  getPlatform() {
    return navigator.platform;
  }

  getRecord(formLogin: FormData) {
    //console.log("Enregistrement", formLogin);
    let pseudoData = formLogin.get("pseudo").toString();
    let mdpData = formLogin.get("mdp").toString(); 
    let mailData = formLogin.get("mail").toString();
    
    let isRecord = this.listCustomer.some((element, index) => (element.pseudo === formLogin.get("pseudo")));
    
    if ( !isRecord) {
      this.listCustomer = [...this.listCustomer, {pseudo : pseudoData, mdp: mdpData, role: "USER", mail: mailData}];
    }
    //console.log("isRecord", isRecord, "Liste de customers :", this.listCustomer);
    return isRecord;
  }

  getLogin(formLogin: FormData) {
    let pseudoData = formLogin.get("pseudo").toString();
    let mdpData = formLogin.get("mdp").toString();

    this.listCustomer.forEach(element => {
    let pseudoData = formLogin.get("pseudo").toString();
      if (element.pseudo === pseudoData && element.mdp === mdpData){
        this.setProfilAuthenticated({pseudo : pseudoData, mdp: mdpData, role: "USER", mail: element.mail });
        this.setIsAutenticated(true);
      }
    })
    return this.getIsAuthenticated();
  }

  public setProfilAuthenticated(resultat) {
    this.profilAuthenticated.next(resultat);
  }

  public getProfilAuthenticated() {
    return this.profilAuthenticated.asObservable();
  }

  public setIsAutenticated(resultat) {
    this.isAuthenticated.next(resultat);
  }

  public getIsAuthenticated() {
    return this.isAuthenticated.asObservable();
  }

  public setIsProfil(resultat) {
    this.isProfil.next(resultat);
  }

  public getIsProfil() {
    return this.isProfil.asObservable();
  }
}
