import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InOutService } from '../services/in-out.service';

@Component({
  selector: 'app-param',
  templateUrl: './param.component.html',
  styleUrls: ['./param.component.scss']
})
export class ParamComponent implements OnInit {

  profilAuthenticated: any;

  constructor(private inout: InOutService, 
    private route: ActivatedRoute, private router: Router) { }

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
