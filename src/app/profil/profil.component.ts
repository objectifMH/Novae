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
  isMain = true;
  isDeconnexion = false;

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
    if (confirm('Etes-vous sûr(e) de vouloir vous deconnecter, ' + this.profilAuthenticated.pseudo.charAt(0).toUpperCase()+this.profilAuthenticated.pseudo.substr(1) + ' !')) {
      this.isDeconnexion = true;
      this.inout.setIsAutenticated(false);
      this.inout.setProfilAuthenticated({pseudo : "", mdp: "", role: "USER", mail:"" });
      setTimeout(() => {  
        this.router.navigate(['/main']);
      }, 2000)
    }
  }

  showParam()
   {
     this.isMain = false;
     this.router.navigate(['param'], {relativeTo: this.route});
   }

   showDasboard()
   {
    this.isMain = true;
   }

}
