import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InOutService } from '../services/in-out.service';

@Component({
  selector: 'app-dash-main',
  templateUrl: './dash-main.component.html',
  styleUrls: ['./dash-main.component.scss']
})
export class DashMainComponent implements OnInit {

  profilAuthenticated: any;

  constructor(private inout: InOutService, 
    private route: ActivatedRoute, private router: Router) { 

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


}
