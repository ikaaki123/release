import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/logni/login.service';
import {PackageItemService} from "../services/package-item/package-item.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 loginUser = {
  companyId: null,
  username: '',
   password: ''
 }
 loginResponse:any;
 errorMessage:any;
 Organizations: any= []

  constructor(private loginService: LoginService, private router: Router, private packageService: PackageItemService) { }

  ngOnInit(): void {
    this.loginService.getOrganization().subscribe(res=>{
      this.Organizations = res;
    })

  }

  login(){
    this.loginService.login(this.loginUser).subscribe(res =>{
     this.loginResponse = res;
     localStorage.setItem("token", this.loginResponse.tokenHandler);
     this.router.navigate(['/home']);
    });
  }

}
