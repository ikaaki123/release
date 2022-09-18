import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl: string = 'https://dastareleaseapi.azurewebsites.net/api';
  constructor(private http: HttpClient) { }

  getOrganization() {
    return this.http.get(`${this.baseUrl}/home/`)
  }

  login(event: any){
   return this.http.post(`${this.baseUrl}/Auth/login`,event)
  }
}
