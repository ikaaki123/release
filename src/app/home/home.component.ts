import { HttpClient } from '@angular/common/http';
import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PackageItemService} from "../services/package-item/package-item.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  show: boolean =true
  router: any;
  constructor(
    private http: HttpClient,
  private roueter: Router,
    private packageService: PackageItemService
  ) { }


  ngOnInit(): void {
    this.packageService.getFileStatus().subscribe(res=>{
    })
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
