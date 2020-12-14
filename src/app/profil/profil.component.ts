import { Component, OnInit } from '@angular/core';
import { InOutService } from '../services/in-out.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  
  profilAuthenticated: any;

  constructor(private inout: InOutService) { }

  ngOnInit(): void {
    this.getLoginAuthenticated();
    this.inout.setIsProfil(true);
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

  deconnexion() {
    this.inout.setIsAutenticated(false);
    this.inout.setProfilAuthenticated({pseudo : "", mdp: "", role: "USER", mail:"" })
  }

}