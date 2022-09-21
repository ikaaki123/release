import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {map, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PackageItemService {

  public fileID = localStorage.getItem('fID');
  public documntID = localStorage.getItem('itemID');
  private subject = new Subject<any>()
  public fileId!: number;
  token = localStorage.getItem('token');
  baseUrl: string = 'https://dastareleaseapi.azurewebsites.net/api';
  baseUrlDrawBack: string = 'https://retrievalsapi.drm.ge/api/'
  
  packgeGridFilter:any = [];

  constructor(
    private http: HttpClient
  ) {
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


   sendMessage(message:any){
     this.subject.next(message)
   }

  receiveMessage(): Observable<any>{
   return this.subject.asObservable();
  }

  getPackageItem(e:any){
    let headers = this.generateHeader()
    return this.http.get(`${this.baseUrl}/Package/GetReleaseMainList?&pageSize=${e.pageSize}&pageNumber=${e.pageNumber}`,{headers:headers})
  }
  getFileStatus(){
    let headers = this.generateHeader()
    return this.http.get(`${this.baseUrl}/Package/GetFileStatus`,{headers:headers})
  }
  searchPackage(filterParams: any,pagenation:any) {
    this.packgeGridFilter = filterParams;
    
    let headers = this.generateHeader()
    let result;
    const params = toHttpParams(filterParams);
    return this.http.get(`${this.baseUrl}/Package/GetReleaseMainList?&pageSize=${pagenation.pageSize}&pageNumber=${pagenation.pageNumber}`,
      { observe: 'response', params, headers:headers})
      .pipe(
        map(response => {
          result = response.body;
          return result;
        })
      );
  }

  getPackageDetail() {
    let headers = this.generateHeader()
    return this.http.get(`${this.baseUrl}/Package/GetReleaseFileDetails?fileId=${this.fileID}`,{headers:headers});
  }

  getFileById(){
    let headers = this.generateHeader()
    return this.http.get(`${this.baseUrl}/Package/GetAllPackage`,{headers:headers})
  }

  savaFile(saveFile: any){
    let headers = this.generateHeader()
    return this.http.post(`${this.baseUrl}/Package/SaveReleasFile`,saveFile,{headers:headers,observe: 'response'})
  }


  getDocumet(){
    let headers = this.generateHeader()
     return this.http.get(`${this.baseUrl}/Package/GetReleaseDocuments?documentId=${this.documntID}`,{headers:headers});

  }
  saveDocument(newData:any){
   console.log(newData);
   
    let headers = this.generateHeader()
     return this.http.post(`${this.baseUrl}/Package/EditReleaseFileDocument`,newData,{headers:headers})}

  logOut() {
     localStorage.removeItem('token');
  }

  checkLogin(){
    return !!localStorage.getItem('token')
  }


  getDocType(){
    let headers = this.generateHeader()
     return this.http.get(`${this.baseUrl}/Package/GetAllFileDocumentType`,{headers:headers});
  }

  getFildsDoc(docFildId: number){
    let headers = this.generateHeader()
     return this.http.get(`${this.baseUrl}/Package/FileDocumentAdditionalFields/${docFildId}`,{headers:headers})
  }

  saveDoc(dataJson:any){
    let headers = this.generateHeader()
    return this.http.post(`${this.baseUrl}/Package/AddFileDocumetRelease`,dataJson,{headers:headers});
  }

  finishReleaseFile(fileId: any) {
    let headers = this.generateHeader()
    return this.http.post(`${this.baseUrl}/Package/FinishReleaseFile`,fileId, {headers:headers});
  }

  getErrorPackages(
    e:any
  ) {
    let headers = this.generateHeader()
    
    return this.http.get( `${this.baseUrlDrawBack}Package/GetErrorPackages?&pageSize=${e.pageSize}&pageNumber=${e.pageNumber}`, {headers:headers});
  }

  // downloadPackageData(filterParams: any,pagenation:any){
  //   //console.log(filterParams);
    
  //   this.packgeGridFilter = filterParams;
    
  //   let headers = this.generateHeader()
  //   const header = new HttpHeaders({
  //     "Content-Type": "application/json",
  //     Accept: "application/json",
  //   });
  //   const httpOptions = {
  //     headers: headers,
  //     responseType: "blob" as "json",
  //   };
  //   // let clientWithType = Object.assign( filterParams)
    
    
  //   //let result;
  //   const params = toHttpParams(filterParams);
  //   console.log(params.updates);
    
  //   return this.http.post(`${this.baseUrl}/Package/DownloadGetReleaseMainList`,
  //   JSON.stringify(filterParams),
  //     {headers:headers}
  //     );
  // }
  downloadPackageData(filterParams: any, pagenation: any) {
    let headers = this.generateHeader()

    const httpOptions = {
      headers: headers,
      responseType: "blob" as "json",
    };
    let result;
    const params = toHttpParams(filterParams);
    return this.http.get<string>(
      this.baseUrl + "/Package/DownloadGetReleaseMainList",
      { headers: headers, responseType: "blob" as "json", observe: "response", params })
      .pipe(
        map(response => {
          result = response.body;
          return result;
        })
      );
  }

  addClient(clientInfo: any){
    console.log(clientInfo);
    
    let headers = this.generateHeader()
    return this.http.post( `${this.baseUrl}/Package/AddFileFromRelease`,clientInfo,{headers:headers})
  }
}

export function toHttpParams(obj: Object): HttpParams {
  let params = new HttpParams();
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      // @ts-ignore
      const val = obj[key];
      if (val !== null && val !== undefined && val !== '') {
        params = params.append(key, val.toString());
      }
    }
  }
  return params;
}
