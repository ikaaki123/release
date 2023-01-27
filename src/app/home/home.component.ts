import { HttpClient } from '@angular/common/http';
import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PackageItemService} from "../services/package-item/package-item.service";
import { JwtHelperService } from "@auth0/angular-jwt";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  show: boolean =true
  router: any;
  jwtHelper = new JwtHelperService();
 decodedToken: any;
 token:any;
  constructor(
    private http: HttpClient,
  private roueter: Router,
    private packageService: PackageItemService
  ) { }


  ngOnInit(): void {
    this.packageService.getFileStatus().subscribe(res=>{
    })
    this.token = localStorage.getItem('token')
    this.decodedToken = this.jwtHelper.decodeToken(this.token );
    console.log(this.decodedToken.CompanyName);
    
  }

  packageitem() {
    this.packageService.packgeGridFilter = []
  }
  route(){
    this.router.navigate(['packageitem'])
  }

  logOut(){
    this.packageService.logOut();
    this.roueter.navigate(['/login'])

  }



}
