import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl: string = 'https://dastareleaseapi.azurewebsites.net/api';
  constructor(private http: HttpClient) { }
  token!: any;
  decodedToken!:any;
  jwtHelper = new JwtHelperService();

  getOrganization() {
    return this.http.get(`${this.baseUrl}/home/`)
  }

  login(event: any){
   return this.http.post(`${this.baseUrl}/Auth/login`,event)
  }

  getInfoFromToken(){
    this.token = localStorage.getItem('token')
    this.decodedToken = this.jwtHelper.decodeToken(this.token);
  }
}
