import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NewspaceoperatorService {
  token = localStorage.getItem('token');
  baseUrl: string = 'https://dastareleaseapi.azurewebsites.net/api';


  constructor(private http: HttpClient, public datePipe: DatePipe) {}
  generateHeader() {
    if (this.token !== localStorage.getItem('token')) {
      this.token = localStorage.getItem('token')
    }
    let newHeaders = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    })
    return newHeaders;
  }

  dateToStringFormater(date: string) {
    let newDate = new Date(date.toString());
    let latest_date = this.datePipe.transform(newDate, "MM/dd/yyyy HH:mm:ss") ?  this.datePipe.transform(newDate, "MM/dd/yyyy HH:mm:ss"): "";
    return latest_date;
  }
//NewSpaceOperator  
  getDataByBoxNumber(boxNumber: any) {
    let headers = this.generateHeader()
    return this.http.get(this.baseUrl +'/Package/GetPackageByBoxNumebr/' + boxNumber, {
      headers: headers
    })
  }

  UpdatePackageStatusForRelease(json :any){
    let headers = this.generateHeader()
    return this.http.put(this.baseUrl +'/Package/UpdatePackageStatusForRelease', json, { headers: headers})
  }

  ChangeBoxForPackage(json:any){
    let headers = this.generateHeader()
    return this.http.put(this.baseUrl +'/Package/ChangeBoxForPackage', json, { headers: headers})
  }
  
  printPackage(documentTypeId: any){
    let headers = this.generateHeader()
    return this.http.post(this.baseUrl +'/Package/PrintPackage/' + documentTypeId,null,{headers: headers})
  }

  FinishBox(boxNumber: any){
      let headers = this.generateHeader()
      return this.http.get(this.baseUrl +'/Package/FinishBox/' + boxNumber, {
        headers: headers
      })
  }

  //NewSpaceOperator

  //RegisterFormPackage
  createBox(model:any){
    let headers = this.generateHeader()
    return this.http.post('https://retrievalsapi.drm.ge/api/Package/CreateBox',model,{headers: headers})
  }

  getBusinessEntities(){
    let headers = this.generateHeader()
    return this.http.get("https://retrievalsapi.drm.ge/api/Package/GetBusinessEntities",{headers: headers})
  }

  GetDocumentType(documentTypeId: number){
    let headers = this.generateHeader()
    return this.http.get("https://retrievalsapi.drm.ge/api/Package/GetDocumentType/"+ documentTypeId,{headers: headers})
  }

  GetDocumentSubType(documentTypeId: number){
    let headers = this.generateHeader()
    return this.http.get("https://retrievalsapi.drm.ge/api/Package/GetDocumentSubType/"+ documentTypeId,{headers: headers})
  }
  ShowExtaFildByBusinessEntitiesId(documentTypeId: number){
    let headers = this.generateHeader()
    return this.http.get("https://retrievalsapi.drm.ge/api/Package/ShowExtaFildByDocumentTyeId/"+ documentTypeId,{headers: headers})
  }
  addPackage(documentTypeId: any){
    let headers = this.generateHeader()
    return this.http.post('https://retrievalsapi.drm.ge/api/Package/AddPackage/',documentTypeId,{headers: headers})
  }

  isBoxInDb(boxNumber: string){
    let headers = this.generateHeader()
    return this.http.get('https://retrievalsapi.drm.ge/api/Package/IsBoxInDb/'+ boxNumber,{headers:headers});
  }

  editPackage(data: any){
    let headers = this.generateHeader()
    return this.http.put('https://retrievalsapi.drm.ge/api/Package/EditPackageForRelease/', data,{headers:headers});
  }

  editPackageStatuses(data:any){
    let headers = this.generateHeader()
    return this.http.put('https://retrievalsapi.drm.ge/api/Package/EditPackageStatuses/',data,{headers:headers});
  }

  packagestatuses(){
    let headers = this.generateHeader()
    return this.http.get('https://retrievalsapi.drm.ge/api/values/packagestatuses',{headers:headers})
  }
  GetPackageCheckStatuses(){
    let headers = this.generateHeader()
    return this.http.get('https://retrievalsapi.drm.ge/api/values/GetPackageCheckStatuses',{headers:headers})
  }
  GetPackageErrorStatuses(){
    let headers = this.generateHeader()
    return this.http.get('https://retrievalsapi.drm.ge/api/values/GetPackageErrorStatuses',{headers:headers})
  }
  GetPackageErrorResolveStatuses(){
    let headers = this.generateHeader()
    return this.http.get('https://retrievalsapi.drm.ge/api/values/GetPackageErrorResolveStatuses',{headers:headers})
  }
}
//RegisterFromPackage


