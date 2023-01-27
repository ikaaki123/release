import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-new-space-manager',
  templateUrl: './new-space-manager.component.html',
  styleUrls: ['./new-space-manager.component.css']
})
export class NewSpaceManagerComponent implements OnInit {
  response: any = [];
  filesours!: any;
  token = localStorage.getItem('token');
  maxDate!: Date;
  date:any;
  correctDate:any;
  constructor(
    private http: HttpClient
  ) { 
    this.maxDate = new Date();
  }

  ngOnInit(): void {
  }
  generateHeader(){
    if(this.token !== localStorage.getItem('token')){
      this.token = localStorage.getItem('token')
    }
    let newHeaders = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    })
    return newHeaders;
  }
  getDateRange(){
    var date = new Date(this.date),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  console.log( [date.getFullYear(), mnth, day].join("-"));
  this.correctDate = [date.getFullYear(), mnth, day].join("-");
  }


  chooseFile(e: any){
  this.filesours = e.target.files[0];
 }


 uploadFile(){
  this.getDateRange();
  if(this.correctDate == null || this.correctDate == '1970-01-01' || this.correctDate == 'NaN-aN-aN'){
    alert('გთხოვთ აირჩიეთ თარიღი.')
  }else{
    let headers = this.generateHeader()
    const formData = new FormData();
    formData.append('file', this.filesours);
  
      this.http.post('https://retrievalsapi.drm.ge/api/Package/uploadBoxByXlsx/'+ this.correctDate, formData,{headers:headers,responseType: 'text'})
        .subscribe(res => {
          console.log(res);
          alert(res);
    });
  }
      
 }
}
