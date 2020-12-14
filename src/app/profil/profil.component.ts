import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { InOutService } from '../services/in-out.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  
  profilAuthenticated: any;

  constructor(private inout: InOutService, 
    private route: ActivatedRoute, private router: Router) { 

    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (val.url.slice(0,7) === '/profil')
        this.inout.setIsProfil(true);
        console.log("profil",val.url.slice(0,7));
      }
    });
  }

  ngOnInit(): void {
    this.getLoginAuthenticated();
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
